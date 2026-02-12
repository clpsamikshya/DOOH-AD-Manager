using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System;
using System.Text.Json.Serialization;

namespace AdManager.Models
{
  public class ProofOfPlay
  {
    public Guid Id { get; set; }
    public Guid ScreenId { get; set; }
    public Guid AdId { get; set; }
    public DateTime PlayedAt { get; set; }


    [JsonIgnore]
    [ValidateNever]
    public Screen? Screen { get; set; }

    [JsonIgnore]
    [ValidateNever]
    public Ad? Ad { get; set; }
  }
}




