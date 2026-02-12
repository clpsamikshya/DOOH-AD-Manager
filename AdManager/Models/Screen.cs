using System.Text.Json.Serialization;

namespace AdManager.Models
{
  public class Screen
  {
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Location { get; set; } = null!;
    public string Resolution { get; set; } = null!;
    public string Status { get; set; } = null!;

    [JsonIgnore]
    public ICollection<CampaignScreen> CampaignScreens { get; set; } = new List<CampaignScreen>();
    public ICollection<CampaignAd> CampaignAds { get; set; } = new List<CampaignAd>();
  }
}



