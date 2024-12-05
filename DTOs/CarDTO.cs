namespace CarRentalAPI.DTOs
{
    public class CarDTO
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public string Type { get; set; }
        public decimal PricePerDay { get; set; }
    }
}
