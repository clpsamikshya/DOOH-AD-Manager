using System.Text.Json.Serialization;

namespace AdManager.Models
{
  public class CampaignAd
  {
    public Guid Id { get; set; }
    public Guid CampaignId { get; set; }
    public Guid AdId { get; set; }
    public int PlayOrder { get; set; }

    [JsonIgnore]
    public Campaign Campaign { get; set; } = null!;
    public Ad Ad { get; set; } = null!;

  }
}



