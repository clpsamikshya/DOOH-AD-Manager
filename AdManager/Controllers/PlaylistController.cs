using AdManager.Data;
using AdManager.Data;
using AdManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dooh.Api.Controllers
{
    [ApiController]
    [Route("api/screens")]
    public class PlaylistController : ControllerBase
    {
        private readonly AppDbContext _db;

        public PlaylistController(AppDbContext db)
        {
            _db = db;
        }



    [HttpGet("{id}/playlist")]
    public async Task<IActionResult> GetPlaylist(Guid id, [FromQuery] DateTime? at = null)
    {
      var currentTime = at ?? DateTime.Now;  // use server local time

      var campaigns = await _db.CampaignScreens
          .Include(cs => cs.Campaign)
          .ThenInclude(c => c.CampaignAds)
              .ThenInclude(ca => ca.Ad)
          .Where(cs => cs.ScreenId == id &&
                       cs.Campaign.StartTime <= currentTime &&
                       cs.Campaign.EndTime >= currentTime)
          .ToListAsync();

      var ads = campaigns
          .SelectMany(c => c.Campaign.CampaignAds)
          .OrderBy(a => a.PlayOrder)
          .Select(a => a.Ad)
          .Distinct()
          .ToList();

      return Ok(ads);
    }




    



  }
}
