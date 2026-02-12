using AdManager.Data;
using AdManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 


namespace Dooh.Api.Controllers
{
    [ApiController]
    [Route("api/proof")]
    public class ProofOfPlayController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ProofOfPlayController(AppDbContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> Log(ProofOfPlay proof)
        {
            proof.Id = Guid.NewGuid();
            proof.PlayedAt = DateTime.UtcNow;

            _db.ProofOfPlays.Add(proof);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var logs = await _db.ProofOfPlays
                .Include(p => p.Ad)
                .Include(p => p.Screen)
                .ToListAsync();
            return Ok(logs);
        }
    }
}
