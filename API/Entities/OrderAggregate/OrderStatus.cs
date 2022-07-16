namespace API.Entities.OrderAggregate
{
    // enum - contains properties that are more hooman-readable
    public enum OrderStatus
    {
        Pending,
        PaymentReceived,
        PaymentFailed
    }
}