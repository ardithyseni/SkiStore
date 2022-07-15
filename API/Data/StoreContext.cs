using API.Entities;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data 
{
    public class StoreContext : IdentityDbContext<User>
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; } // the name of the sql table

        public DbSet<Basket> Baskets { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole{Name ="User", NormalizedName = "USER"},
                    new IdentityRole{Name ="Manager", NormalizedName = "MANAGER"},
                    new IdentityRole{Name ="Admin", NormalizedName = "ADMIN"}
                );
        }

    }
}