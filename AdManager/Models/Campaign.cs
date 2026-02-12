using System;

namespace AdManager.Models
{
  public class Campaign
  {
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<CampaignAd> CampaignAds { get; set; } = new List<CampaignAd>();
    public ICollection<CampaignScreen> CampaignScreens { get; set; } = new List<CampaignScreen>();
  }
}



