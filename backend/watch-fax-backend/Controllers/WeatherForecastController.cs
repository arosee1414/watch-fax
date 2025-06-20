using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using watch_fax_backend.Infrastructure.Configuration.Cosmos;
using watch_fax_backend.Infrastructure.Extensions;
using watch_fax_backend.Models;

namespace watch_fax_backend.Controllers
{
    [ApiController]
    //[Authorize]
    [Route("api/v1/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly CosmosContext _cosmosContext;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, CosmosContext cosmosContext)
        {
            _logger = logger;
            _cosmosContext = cosmosContext ?? throw new ArgumentNullException(nameof(cosmosContext));
        }

    [HttpGet(Name = "GetWeatherForecast")]
        public async Task<IEnumerable<WeatherForecast>> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
