namespace watch_fax_backend.Infrastructure.Configuration.Cosmos
{
    public class CosmosConfiguration
    {
        public string ConnectionString { get; set; }

        public string AccountEndpoint { get; set; }

        public string DatabaseName { get; set; }

        public string UserCollectionsContainerName { get; set; }
    }
}
