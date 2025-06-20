using Microsoft.Azure.Cosmos.Linq;
using Microsoft.Azure.Cosmos;

namespace watch_fax_backend.Infrastructure.Extensions
{
    public static class CosmosExtensions
    {

        public static async Task<T> Get<T>(this Container container, string id)
        {
            try
            {
                return await container.ReadItemAsync<T>(id, new PartitionKey(id)).ConfigureAwait(false);
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return default!;
            }
        }

        public static async Task<T> InsertItem<T>(this Container container, T item)
        {
            var response = await container.CreateItemAsync<T>(item).ConfigureAwait(false);
            return response;
        }

        public static async Task<List<T>> ToListAsync<T>(this IQueryable<T> queryable)
        {
            using FeedIterator<T> feedIterator = queryable.ToFeedIterator();
            return await feedIterator.ToListAsync();
        }

        public static async Task<List<T>> ToListAsync<T>(this FeedIterator<T> feedIterator)
        {
            var results = new List<T>();

            await foreach (var item in feedIterator.IAsyncEnumerable())
            {
                results.Add(item);
            }

            return results;
        }

        public static async IAsyncEnumerable<T> IAsyncEnumerable<T>(this FeedIterator<T?> feedIterator)
        {
            while (feedIterator.HasMoreResults)
            {
                var feedResponse = await feedIterator.ReadNextAsync();
                foreach (var item in feedResponse)
                {
                    yield return item;
                }
            }
        }
    }
}
