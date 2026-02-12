using AdManager.Data;
using AdManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdManager.Controllers
{
    [ApiController]
    [Route("api/screens")]
    public class ScreensController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ScreensController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _db.Screens.ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create(Screen screen)
        {
            screen.Id = Guid.NewGuid();
            _db.Screens.Add(screen);
            await _db.SaveChangesAsync();
            return Created("", screen);
        }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, Screen updatedScreen)
    {
      if (id != updatedScreen.Id)
        return BadRequest("Route ID and Screen ID do not match.");

      var existingScreen = await _db.Screens.FindAsync(id);

      if (existingScreen == null)
        return NotFound($"Screen with ID {id} not found.");

      // Update fields
      existingScreen.Name = updatedScreen.Name;
      existingScreen.Location = updatedScreen.Location;
      existingScreen.Resolution = updatedScreen.Resolution;
      existingScreen.Status = updatedScreen.Status;

      await _db.SaveChangesAsync();

      return Ok(existingScreen);
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
      // Find the screen by ID
      var screen = await _db.Screens
          .Include(s => s.CampaignScreens) // Include related CampaignScreens
          .FirstOrDefaultAsync(s => s.Id == id);

      if (screen == null)
        return NotFound($"Screen with ID {id} not found.");

      // Optional: Remove associations with campaigns
      if (screen.CampaignScreens.Any())
        _db.CampaignScreens.RemoveRange(screen.CampaignScreens);

      // Remove the screen itself
      _db.Screens.Remove(screen);

      await _db.SaveChangesAsync();

      return NoContent(); // 204 No Content
    }

  }
}
