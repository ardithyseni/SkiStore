using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace API.Services
{

    public class PaymentService
    {
        private readonly IConfiguration _config;
        public PaymentService(IConfiguration config) // appsettingsDevelopment.json
        {
            _config = config;
        }

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var service = new PaymentIntentService();
            var intent = new PaymentIntent();

            var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);

            var deliveryFee = subtotal > 100 ? 0 : 10;

            if (string.IsNullOrEmpty(basket.PaymentIntentId)) // if no payment already; create one
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (subtotal + deliveryFee) * 100,
                    Currency = "eur",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                intent = await service.CreateAsync(options);
                
            }
            else // update the amount, cause that's the only available option to change
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = subtotal + deliveryFee
                };
                await service.UpdateAsync(basket.PaymentIntentId, options);
            }

            return intent;
        }
    }
}