using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using watch_fax_backend.Infrastructure.Configuration;
using watch_fax_backend.Infrastructure.Configuration.Cosmos;
using watch_fax_backend.Infrastructure.Configuration.Storage;
using watch_fax_backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var clerkAuthority = builder.Configuration["ClerkConfiguration:Authority"];
builder.Services.Configure<Configuration>(builder.Configuration.GetSection("Configuration"));
builder.Services.Configure<CosmosConfiguration>(builder.Configuration.GetSection("CosmosConfiguration"));
builder.Services.Configure<StorageConfiguration>(builder.Configuration.GetSection("StorageConfiguration"));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}

builder.Services.AddHttpClient();
builder.Services.AddLogging(logging =>
{
    logging.AddConsole();
    logging.AddDebug();
    logging.SetMinimumLevel(LogLevel.Trace);
});

builder.Services.AddApplicationInsightsTelemetry(new Microsoft.ApplicationInsights.AspNetCore.Extensions.ApplicationInsightsServiceOptions
{
    ConnectionString = builder.Configuration["APPLICATIONINSIGHTS_CONNECTION_STRING"],
    EnableAdaptiveSampling = false
});

builder.Services.AddSingleton(provider =>
{
    var cosmosConfig = provider.GetRequiredService<IOptions<CosmosConfiguration>>().Value;
    var cosmosClientOptions = new CosmosClientOptions
    {
        SerializerOptions = new CosmosSerializationOptions
        {
            PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase
        }
    };
    var cosmosClient = new CosmosClient(cosmosConfig.ConnectionString, cosmosClientOptions);
    return cosmosClient;
});

builder.Services.AddSingleton<CosmosContext>(provider =>
{
    var cosmosConfig = provider.GetRequiredService<IOptions<CosmosConfiguration>>().Value;
    var cosmosClient = provider.GetRequiredService<CosmosClient>();
    return new CosmosContext(cosmosClient, cosmosConfig);
});
builder.Services.AddSingleton<BlobStorageClient>(provider =>
{
    var blobStorageConfig = provider.GetRequiredService<IOptions<StorageConfiguration>>().Value;
    return new BlobStorageClient(blobStorageConfig.ConnectionString, blobStorageConfig.BlobContainerName);
});

builder.Services.AddSingleton<UserCollectionsService>();

// Configure JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = clerkAuthority; // Replace with your Clerk Issuer URL
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = clerkAuthority, // Clerk JWT issuer
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKeyResolver = (token, securityToken, identifier, parameters) =>
            {
                var json = new WebClient().DownloadString($"{clerkAuthority}/.well-known/jwks.json");
                var keys = new JsonWebKeySet(json);
                return keys.Keys;
            }
        };
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<object>>();
                logger.LogError("Authentication failed: {0}", context.Exception.Message);
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<object>>();
                var claims = context.Principal?.Claims.Select(c => $"{c.Type}: {c.Value}").ToList();
                logger.LogInformation("Token validated successfully. Claims: {0}", string.Join(", ", claims));
                return Task.CompletedTask;
            },
            OnChallenge = context =>
            {
                var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<object>>();
                logger.LogWarning("JWT authentication challenge triggered. Error: {0}", context.ErrorDescription);
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins("http://localhost:8081", "http://10.0.0.31:8081", "https://10.0.0.210") //        policy.WithOrigins("http://localhost:8081") // Replace with your frontend URL                                                                                                   // Replace with your frontend URL
              .AllowAnyMethod() // Allow any HTTP method (GET, POST, etc.)
              .AllowAnyHeader() // Allow any header
              .AllowCredentials(); // Allow credentials (cookies, authentication tokens)
    });
});

var app = builder.Build();

app.UseCors("AllowLocalhost");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Watch Fax API V1");
        c.OAuthAppName("Watch Fax");
        c.EnablePersistAuthorization();
    });
}

//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
