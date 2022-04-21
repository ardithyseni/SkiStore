using System;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {
    public class BasketController: BaseApiController {
        private readonly StoreContext _context;

        public BasketController(StoreContext context) 
        {
            _context = context;
        }

        // 3 endpoints: 1 fetch a basket 2. add an item 3. remove an item

        [HttpGet]
        public async Task < ActionResult < Basket >> GetBasket() 
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            return basket;

        }

        [HttpPost] // api/basket ?productId=3 & quantity=2
        public async Task < ActionResult > AddItemToBasket(int productId, int quantity)
        {
            
            // get basket || create basket
            var basket = await RetrieveBasket();

            if (basket == null) basket = CreateBasket();

            // get product
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();

            // add item
            basket.AddItem(product, quantity);

            // save changes
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return StatusCode(201);

            return BadRequest(new ProblemDetails{Title = "Problem saving item to basket"});
        }

        [HttpDelete]
        public async Task < ActionResult > RemoveBasketItem(int productId, int quantity) 
        {
            // get basket
            // remove item or reduce quantity
            // save changes
            return Ok();
        }

        private async Task < Basket > RetrieveBasket() {
            var basket = await _context.Baskets
                .Include(i => i.Items) // include related entities in the query
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
            return basket;
        }

        private Basket CreateBasket() {
            var buyerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions {
                IsEssential = true, 
                Expires = DateTime.Now.AddDays(30)
            };

            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket {
                BuyerId = buyerId
            };
            _context.Add(basket);

            return basket;
        }

    }
}