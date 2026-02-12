
using AdManager.Data;
using AdManager.Models;
using AdManager.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dooh.Api.Controllers
{
  [ApiController]
  [Route("api/campaign-screens")]
  public class CampaignScreensController : ControllerBase
  {
    private readonly AppDbContext _db;

    public CampaignScreensController(AppDbContext db)
    {
      _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Get() =>
        Ok(await _db.CampaignScreens.ToListAsync());

    

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CampaignCreateDto dto)
    {
      if (dto == null) return BadRequest("DTO cannot be null.");
      if (dto.EndTime <= dto.StartTime) return BadRequest("EndTime must be after StartTime.");

      var campaign = new Campaign
      {
        Id = Guid.NewGuid(),
        Name = dto.Name,
        StartTime = dto.StartTime,
        EndTime = dto.EndTime,
        CreatedAt = DateTime.UtcNow
      };

      _db.Campaigns.Add(campaign);

      // Auto-assign to all screens
      var screens = await _db.Screens.ToListAsync();
      var campaignScreens = screens.Select(s => new CampaignScreen
      {
        Id = Guid.NewGuid(),
        CampaignId = campaign.Id,
        ScreenId = s.Id
      }).ToList();

      _db.CampaignScreens.AddRange(campaignScreens);

      await _db.SaveChangesAsync();
      return Ok(campaign);
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
      var cs = await _db.CampaignScreens.FindAsync(id);
      if (cs == null) return NotFound();

      _db.CampaignScreens.Remove(cs);
      await _db.SaveChangesAsync();
      return NoContent();
    }
  }
}



