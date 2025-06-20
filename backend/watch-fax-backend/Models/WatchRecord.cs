namespace watch_fax_backend.Models
{
    public class WatchRecord : WatchRecordCreateRequest
    {
        public string Id { get; set; }

        public string UserId { get; set; }
    }
}
