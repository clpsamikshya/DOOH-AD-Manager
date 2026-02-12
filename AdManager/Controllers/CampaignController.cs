using AdManager.Data;
using AdManager.Dto;
using AdManager.Models;
using AdManager.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dooh.Api.Controllers
{
  [ApiController]
  [Route("api/campaigns")]
  public class CampaignsController : ControllerBase
  {
    private readonly AppDbContext _db;

    public CampaignsController(AppDbContext db)
    {
      _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      var campaigns = await _db.Campaigns
          .Include(c => c.CampaignScreens)  
              .ThenInclude(cs => cs.Screen) 
          .Include(c => c.CampaignAds)     
              .ThenInclude(ca => ca.Ad)
              .ToListAsync();

      return Ok(campaigns);
    }



    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
      var campaign = await _db.Campaigns
          .Include(c => c.CampaignScreens)
              .ThenInclude(cs => cs.Screen)
          .Include(c => c.CampaignAds)
              .ThenInclude(ca => ca.Ad)
          .FirstOrDefaultAsync(c => c.Id == id);

      if (campaign == null) return NotFound();
      return Ok(campaign);
    }


    // POST: create new campaign
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CampaignCreateDto dto)
    {
      if (dto == null) return BadRequest("DTO cannot be null.");

      if (dto.EndTime <= dto.StartTime)
        return BadRequest("EndTime must be after StartTime.");

      var campaign = new Campaign
      {
        Id = Guid.NewGuid(),
        Name = dto.Name,
        StartTime = dto.StartTime,
        EndTime = dto.EndTime,
        CreatedAt = DateTime.UtcNow
      };

      _db.Campaigns.Add(campaign);
      await _db.SaveChangesAsync();

      return Ok(campaign);
    }

    // DELETE campaign
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
      var campaign = await _db.Campaigns.FindAsync(id);
      if (campaign == null) return NotFound();

      _db.Campaigns.Remove(campaign);
      await _db.SaveChangesAsync();

      return NoContent();
    }
  }
}
