using AdManager.Data;
using AdManager.Models;
using AdManager.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Dooh.Api.Controllers
{
  [ApiController]
  [Route("api/campaign-ads")]
  public class CampaignAdsController : ControllerBase
  {
    private readonly AppDbContext _db;

    public CampaignAdsController(AppDbContext db)
    {
      _db = db;
    }

    

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      var campaignAds = await _db.CampaignAds
          .Include(ca => ca.Ad)
          .Include(ca => ca.Campaign)
          .Select(ca => new
          {
            ca.Id,
            ca.CampaignId,
            ca.AdId,
            PlayOrder = ca.PlayOrder,
            CampaignName = ca.Campaign.Name,   // only include needed fields
            AdTitle = ca.Ad.Title
          })
          .ToListAsync();

      return Ok(campaignAds);
    }


    // POST: create campaign ads (single or list)
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] List<CampaignAdCreateDto> dtos)
    {
      if (dtos == null || !dtos.Any())
        return BadRequest("No campaign ads provided.");

      var campaignAds = new List<CampaignAd>();

      foreach (var dto in dtos)
      {
        var campaignExists = await _db.Campaigns.AnyAsync(c => c.Id == dto.CampaignId);
        var adExists = await _db.Ads.AnyAsync(a => a.Id == dto.AdId);

        if (!campaignExists)
          return BadRequest($"Campaign {dto.CampaignId} does not exist.");
        if (!adExists)
          return BadRequest($"Ad {dto.AdId} does not exist.");

        campaignAds.Add(new CampaignAd
        {
          Id = Guid.NewGuid(),
          CampaignId = dto.CampaignId,
          AdId = dto.AdId,
          PlayOrder = dto.PlayOrder
        });
      }

      _db.CampaignAds.AddRange(campaignAds);
      await _db.SaveChangesAsync();

      return Ok(campaignAds);
    }


    // DELETE a campaign ad by ID
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
      var ca = await _db.CampaignAds.FindAsync(id);
      if (ca == null) return NotFound();

      _db.CampaignAds.Remove(ca);
      await _db.SaveChangesAsync();

      return NoContent();
    }
  }
}
