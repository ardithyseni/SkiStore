using System.Collections.Generic;
using System.Linq;
using API.Entities;

namespace API.Data
{
    // when we use static classes, we don't need to reinstantiate
    // everytime we use that class
    public static class DbInitializer 
    {
        public static void Initialize(StoreContext context) 
        {
            if (context.Products.Any()) return ; // nese kena diqka mos kthe diqka

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Speedster Board 2000",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 390,
                    PictureUrl = "https://static.privatesportshop.com/img/p/3275991-9994510-thickbox.jpg",
                    Brand = "Elan",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green Board 3000",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 400,
                    PictureUrl = "https://www.skioccas.com/2470-zoom_popin/snowboard-atomic-aia-black-yellow.jpg",
                    Brand = "Atomic",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Board Speed Rush 3",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 420,
                    PictureUrl = "https://cdn-mdb.head.com/CDN3/D/330311/1/1430x464/architect.jpg",
                    Brand = "Head",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Head Super Board",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 460,
                    PictureUrl = "https://cdn-mdb.head.com/CDN3/D/330110/1/1430x464/day-lyt.jpg",
                    Brand = "Head",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Fischer Board Whizzy Fast",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 530,
                    PictureUrl = "https://images.evo.com/imgp/zoom/139060/589753/clone.jpg",
                    Brand = "Fischer",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Burton Entry Board",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 450,
                    PictureUrl = "https://www.burton.com/static/product/W23/10692109000152_1.png?impolicy=bglt&imwidth=486",
                    Brand = "Burton",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Blue Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 35,
                    PictureUrl = "https://cdn-mdb.head.com/CDN3/D/828071_TQ/1/768x768/snow-beanie-turquoise.jpg",
                    Brand = "Head",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Fischer Woolen Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 36,
                    PictureUrl = "https://www.fischersports.com/media/image/1f/44/6d/G31318_Beanie_LOGO_reversible_black-yellow_915x915.jpg",
                    Brand = "Fischer",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Blue Fischer Woolen Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 28,
                    PictureUrl = "https://www.fischersports.com/media/image/5a/cd/6a/G34721_Beanie_TUX_electric_blue_915x915.jpg",
                    Brand = "Fischer",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Blue Roxy Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 50,
                    PictureUrl = "https://images.evo.com/imgp/700/196829/815665/roxy-freshfields-gloves-women-s-.jpg",
                    Brand = "Roxy",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Leaf Roxy Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 50,
                    PictureUrl = "https://images.boardriders.com/globalGrey/roxy-products/all/default/xlarge/erjhn03192_roxy,p_kvj1_frt1.jpg",
                    Brand = "Roxy",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Purple Burton Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 38,
                    PictureUrl = "https://www.bfgcdn.com/1500_1500_90/202-2177/burton-youth-vent-glove-gloves.jpg",
                    Brand = "Burton",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green Burton Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 47,
                    PictureUrl = "https://cdn.shopify.com/s/files/1/0057/5137/3895/products/ducas_700x.jpg?v=1643258504",
                    Brand = "Burton",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Rossignol Black & Green Boots",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 200,
                    PictureUrl = "https://www.rossignol.com/media/catalog/product/r/b/rbj8050_speed_100_rgb72dpi_01.jpg?width=585&height=585&canvas=585,585&optimize=high&bg-color=255,255,255&fit=bounds",
                    Brand = "Rossignol",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Head White Boots",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 219,
                    PictureUrl = "https://sportland.com/media/catalog/product/cache/e4932a31a34e41e69084883e2b608489/6/0/607008_2a62.jpg",
                    Brand = "Head",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Head Black Boots",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 180,
                    PictureUrl = "https://www.tradeinn.com/f/13722/137224200/head-edge-lyt-100-alpine-ski-boots.jpg",
                    Brand = "Head",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Atomic Black Boots",
                    Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                    Price = 210,
                    PictureUrl = "https://cdn.webshopapp.com/shops/212063/files/346454225/atomic-ski-boots-hawx-magna-110-s-black.jpg",
                    Brand = "Atomic",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Atomic Blue Boots",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 220,
                    PictureUrl = "https://www.rei.com/media/8e8ec850-dd3b-4ee8-8417-a9adaf603311?size=784x588",
                    Brand = "Atomic",
                    Type = "Boots",
                    QuantityInStock = 100
                },
            };
 
            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}