using watch_fax_backend.Infrastructure.Configuration.Storage;

namespace watch_fax_backend.Infrastructure.Configuration
{
    public class Configuration
    {
        public ClerkConfiguration ClerkConfiguration { get; set; }

        public StorageConfiguration StorageConfiguration { get; set; }
    }
}
