using AdManager.Data;
using AdManager.Models;
using AdManager.Data;
using AdManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


    [ApiController]
    [Route("api/ads")]
    public class AdsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public AdsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult>
    Get() => Ok(await _db.Ads.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var ad = await _db.Ads.FindAsync(id);
            if (ad == null) return NotFound();
            return Ok(ad);
        }

  

  [HttpPost]
  public async Task<IActionResult> Create([FromBody] Ad ad, [FromQuery] Guid? campaignId = null)
  {
    ad.Id = Guid.NewGuid();
    ad.CreatedAt = DateTime.UtcNow;
    _db.Ads.Add(ad);

    if (campaignId.HasValue)
    {
      var campaignExists = await _db.Campaigns.AnyAsync(c => c.Id == campaignId.Value);
      if (!campaignExists) return BadRequest("Campaign does not exist.");

      var campaignAd = new CampaignAd
      {
        Id = Guid.NewGuid(),
        CampaignId = campaignId.Value,
        AdId = ad.Id,
        PlayOrder = 1 // or auto-increment logic
      };
      _db.CampaignAds.Add(campaignAd);
    }

    await _db.SaveChangesAsync();
    return CreatedAtAction(nameof(GetById), new { id = ad.Id }, ad);
  }



  [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, Ad ad)
    {
        var existing = await _db.Ads.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Title = ad.Title;
        existing.MediaUrl = ad.MediaUrl;
        existing.DurationSeconds = ad.DurationSeconds;
        existing.MediaType = ad.MediaType;

        await _db.SaveChangesAsync();
        return NoContent();
    }


    [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var ad = await _db.Ads.FindAsync(id);
            if (ad == null) return NotFound();

            _db.Ads.Remove(ad);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }

