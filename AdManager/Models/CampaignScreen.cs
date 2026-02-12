using System;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace AdManager.Models
{
  public class CampaignScreen
  {
    public Guid Id { get; set; }
    public Guid CampaignId { get; set; }
    [JsonIgnore][ValidateNever] public Campaign? Campaign { get; set; }

    public Guid ScreenId { get; set; }
    [JsonIgnore][ValidateNever] public Screen? Screen { get; set; }
  }
}


