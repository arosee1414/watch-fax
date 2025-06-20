using Microsoft.Azure.Cosmos;

namespace watch_fax_backend.Infrastructure.Configuration.Cosmos
{
    public class CosmosContext
    {
        public CosmosContext(CosmosClient cosmosClient, CosmosConfiguration cosmosConfiguration)
        {
            UserCollectionsContainer = cosmosClient.GetContainer(cosmosConfiguration.DatabaseName, cosmosConfiguration.UserCollectionsContainerName);
        }

        public Container UserCollectionsContainer { get; }
    }
}
