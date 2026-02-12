
using System;

namespace AdManager.Models
{
  public class Ad
  {
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public string MediaUrl { get; set; } = null!;
    public int DurationSeconds { get; set; }
    public string MediaType { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid ScreenId { get; set; }
    public Screen? Screen { get; set; }
    public ICollection<CampaignAd> CampaignAds { get; set; } = new List<CampaignAd>();
  }
}



