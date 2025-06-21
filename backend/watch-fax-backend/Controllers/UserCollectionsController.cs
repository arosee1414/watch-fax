using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos.Serialization.HybridRow;
using System.Security.Claims;
using watch_fax_backend.Models;
using watch_fax_backend.Services;

namespace watch_fax_backend.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/v1/[controller]")]
    public class UserCollectionsController : ControllerBase
    {
        private readonly ILogger<UserCollectionsController> _logger;
        private readonly UserCollectionsService _userCollectionsService;

        public UserCollectionsController(ILogger<UserCollectionsController> logger, UserCollectionsService userCollectionsService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _userCollectionsService = userCollectionsService ?? throw new ArgumentNullException(nameof(userCollectionsService));
        }

        [HttpPost(Name = "CreateWatch")]
        public async Task<ActionResult<WatchRecord>> CreateWatch([FromForm] WatchRecordCreateRequest request)
        {
            var correlationId = Guid.NewGuid().ToString();
            var scenario = $"{GetType()} | {nameof(CreateWatch)}";

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                _logger.LogError($"{scenario} | User ID was null. CorrelationId: {correlationId}");
                return Unauthorized();
            }

            _logger.LogInformation($"{scenario} | Received request to create watch for user {userId}. CorrelationId: {correlationId}");

            if (request == null)
            {
                _logger.LogError($"{scenario} | Request was null. CorrelationId: {correlationId}");
                return BadRequest();
            }

            try
            {
                var result = await _userCollectionsService.CreateWatch(userId, request, correlationId);
                _logger.LogInformation($"{scenario} | Watch with ID {result.Id} created successfully. CorrelationId: {correlationId}");
                return Ok(result);
            } 
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{scenario} | Exception creating watch for user {userId}. CorrelationId: {correlationId}");

                return StatusCode(500, new
                {
                    error = "An error occurred while creating the watch.",
                    correlationId,
                });
            }           
        }

        [HttpGet(Name = "GetAllWatchRecords")]
        public async Task<ActionResult<IEnumerable<WatchRecord>>> GetAllWatchesForUser()
        {
            var correlationId = Guid.NewGuid().ToString();
            var scenario = $"{GetType()} | {nameof(GetAllWatchesForUser)}";

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                _logger.LogError($"{scenario} | User ID was null. CorrelationId: {correlationId}");
                return Unauthorized();
            }

            _logger.LogInformation($"{scenario} | Received request to get all watches for user {userId}. CorrelationId: {correlationId}");

            var results = await _userCollectionsService.GetAllWatchesForUser(userId, correlationId);

            return Ok(results);
        }
    }
}
