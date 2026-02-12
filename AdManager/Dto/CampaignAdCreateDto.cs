using System;

namespace AdManager.Models.Dto
{
  public class CampaignAdCreateDto
  {
    public Guid CampaignId { get; set; }
    public Guid AdId { get; set; }
    public int PlayOrder { get; set; }
  }
}





