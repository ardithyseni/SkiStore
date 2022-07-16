using System.Collections.Concurrent;
using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data 
{
    public class StoreContext : IdentityDbContext<User, Role, int>
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; } // the name of the sql table

        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Order> Orders { get; set; } // nuk na vyn me kthy najher veq ni order item
        // po veq orders t plota

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>() // a user
                .HasOne(a => a.Address) // has one address {{navigation property}}
                .WithOne() // with one user ?!!@ :)
                .HasForeignKey<UserAddress>( a => a.Id)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>()
                .HasData(
                    new Role{Id = 1, Name = "User", NormalizedName = "USER"},
                    new Role{Id = 2, Name = "Manager", NormalizedName = "MANAGER"},
                    new Role{Id = 3, Name = "Admin", NormalizedName = "ADMIN"}
                );
        }

    }
}