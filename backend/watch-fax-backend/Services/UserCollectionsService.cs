using watch_fax_backend.Infrastructure.Configuration.Cosmos;
using watch_fax_backend.Infrastructure.Configuration.Storage;
using watch_fax_backend.Infrastructure.Extensions;
using watch_fax_backend.Models;

namespace watch_fax_backend.Services
{
    public class UserCollectionsService
    {
        private readonly CosmosContext _cosmosContext;
        private readonly ILogger<UserCollectionsService> _logger;
        private readonly BlobStorageClient _blobStorageClient;

        public UserCollectionsService(CosmosContext cosmosContext, ILogger<UserCollectionsService> logger, BlobStorageClient blobStorageClient)
        {
            _cosmosContext = cosmosContext ?? throw new ArgumentNullException(nameof(cosmosContext));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _blobStorageClient = blobStorageClient ?? throw new ArgumentNullException(nameof(blobStorageClient));
        }

        public async Task<IEnumerable<WatchRecord>> GetAllWatchesForUser(string userId, string correlationId)
        {
            var scenario = $"{GetType()} | {nameof(GetAllWatchesForUser)}";
            _logger.LogInformation($"{scenario} | Attempting to get watch records for user {userId}. CorrelationId: {correlationId}");

            var records = await _cosmosContext.UserCollectionsContainer.GetItemLinqQueryable<WatchRecord>().Where(x => x.UserId == userId).ToListAsync();

            _logger.LogInformation($"{scenario} | Found {records.Count()} watch records for user {userId}. CorrelationId: {correlationId}");

            return records;
        }

        public async Task<WatchRecord> CreateWatch(string userId, WatchRecordCreateRequest request, string correlationId)
        {
            var scenario = $"{GetType()} | {nameof(CreateWatch)}";

            var imageUrls = new List<string>();

            if (request.Images != null)
            {
                foreach (var file in request.Images)
                {
                    if (file != null && file.Length > 0)
                    {
                        var url = await _blobStorageClient.UploadImageAsync(file);
                        imageUrls.Add(url);
                    }
                }
            }
            

            var watchRecord = new WatchRecord()
            {
                Id = Guid.NewGuid().ToString(),
                Brand = request.Brand,
                DescriptionOfCondition = request.DescriptionOfCondition,
                HasBox = request.HasBox,
                HasPapers = request.HasPapers,
                HasRecordOfAuthentication = request.HasRecordOfAuthentication,
                Model = request.Model,
                ProductionYear = request.ProductionYear,
                PurchaseDate = request.PurchaseDate,
                PurchasePrice = request.PurchasePrice,
                ReferenceNumber = request.ReferenceNumber,
                SerialNumber = request.SerialNumber,
                Story = request.Story,
                UserId = userId,
                ImageUrls = imageUrls,
            };

            _logger.LogInformation($"{scenario} | Attempting to create watch with ID {watchRecord.Id}. CorrelationId: {correlationId}");
            return await _cosmosContext.UserCollectionsContainer.InsertItem<WatchRecord>(watchRecord);
        }
    }
}
