namespace API.DTOs
{
    /*
    DTO Data Transfer Objects - simple plain objects, that contain
    the properties that we want to extract from our entities, and 
    return with our response OK
    */
    public class BasketItemDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public int Quantity { get; set; }
    }
}