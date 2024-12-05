namespace CarRentalAPI.DTOs
{
    public class RentalDTO
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public int CarId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalPrice { get; set; }
    }
}