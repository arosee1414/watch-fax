namespace watch_fax_backend.Models
{
    public class WatchRecord
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        public string Brand { get; set; }

        public string Model { get; set; }

        public string ReferenceNumber { get; set; }

        public string? SerialNumber { get; set; }

        public int? ProductionYear { get; set; }

        public long? PurchaseDate { get; set; }

        public float? PurchasePrice { get; set; }

        public bool? HasPapers { get; set; }

        public bool? HasBox { get; set; }

        public bool? HasRecordOfAuthentication { get; set; }

        public string? DescriptionOfCondition { get; set; }

        public string? Story { get; set; }

        public IEnumerable<string> ImageUrls { get; set; }
    }
}
