using System.Collections.Generic;

namespace API.DTOs
{
    /*
        JSON Serializer e kqyr basket.cs edhe aj mrena ka list of items
        tani shkon mi serialize items, po items ka referenca edhe per 
        basket
        tani apet shkon te basket i kqyr qe ka edhe items
        tani loop de loop ( object cycle detected error )
    */
    public class BasketDto
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; }
        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }
    }
}