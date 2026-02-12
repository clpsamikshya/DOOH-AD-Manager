using System;

namespace AdManager.Models.Dto
{
  public class CampaignCreateDto
  {
    public string Name { get; set; } = null!;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
  }
}



