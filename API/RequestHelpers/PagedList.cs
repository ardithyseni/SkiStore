using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{
    public class PagedList<T> : List<T>
    {
        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            MetaData = new MetaData
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize)
            };
            AddRange(items);
        }

        public MetaData MetaData { get; set; }

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, 
            int pageNumber, int pageSize)
        {
            var count = await query.CountAsync();
            // if pageSize is 10, we want the second page of 18 elements, skip (2 - 1 * 10). take the next remaining
            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}