using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate
{
    // this is going to contain a "snapshot" of the item as it was
    // when it was ordered
    [Owned]
    public class ProductItemOrdered
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }

    }
}