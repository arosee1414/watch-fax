using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace watch_fax_backend.Infrastructure.Configuration.Storage
{
    public class BlobStorageClient
    {
        private readonly string _containerName;
        private readonly BlobContainerClient _blobContainerClient;
        private readonly BlobServiceClient _blobServiceClient;
        private readonly string _storageAccountName;
        private readonly StorageSharedKeyCredential _storageCredentials;

        public BlobStorageClient(string connectionString, string containerName)
        {
            _containerName = containerName;
            _blobServiceClient = new BlobServiceClient(connectionString);
            _blobContainerClient = _blobServiceClient.GetBlobContainerClient(containerName);

            // Parse account name and key from connection string for SAS signing
            var connStringParts = connectionString.Split(';');
            _storageAccountName = GetConnectionStringValue(connStringParts, "AccountName");
            var accountKey = GetConnectionStringValue(connStringParts, "AccountKey");
            _storageCredentials = new StorageSharedKeyCredential(_storageAccountName, accountKey);
        }

        private string GetConnectionStringValue(string[] parts, string key)
        {
            foreach (var part in parts)
            {
                if (part.StartsWith(key + "=", StringComparison.InvariantCultureIgnoreCase))
                    return part.Substring(key.Length + 1);
            }
            throw new InvalidOperationException($"Key '{key}' not found in connection string.");
        }

        public async Task<string> UploadImageAsync(IFormFile file)
        {
            var blobName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var blobClient = _blobContainerClient.GetBlobClient(blobName);

            using var stream = file.OpenReadStream();
            await blobClient.UploadAsync(stream, overwrite: true);

            // Return the SAS URL
            return GenerateSasUri(blobClient, TimeSpan.FromHours(1)).ToString();
        }

        private Uri GenerateSasUri(BlobClient blobClient, TimeSpan validDuration)
        {
            // Set the SAS token parameters
            var sasBuilder = new BlobSasBuilder
            {
                BlobContainerName = _containerName,
                BlobName = blobClient.Name,
                Resource = "b", // b = blob
                StartsOn = DateTimeOffset.UtcNow.AddMinutes(-5), // small clock skew allowance
                ExpiresOn = DateTimeOffset.UtcNow.Add(validDuration),
            };

            sasBuilder.SetPermissions(BlobSasPermissions.Read);

            // Generate the SAS token
            var sasToken = sasBuilder.ToSasQueryParameters(_storageCredentials).ToString();

            // Construct full URI with SAS token
            var sasUri = new UriBuilder(blobClient.Uri)
            {
                Query = sasToken
            };

            return sasUri.Uri;
        }
    }
}
