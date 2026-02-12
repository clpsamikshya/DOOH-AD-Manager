using Microsoft.EntityFrameworkCore;
using AdManager.Models;

namespace AdManager.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Screen> Screens { get; set; } = null!;
    public DbSet<Ad> Ads { get; set; } = null!;
    public DbSet<Campaign> Campaigns { get; set; } = null!;
    public DbSet<CampaignAd> CampaignAds { get; set; } = null!;
    public DbSet<CampaignScreen> CampaignScreens { get; set; } = null!;
    public DbSet<ProofOfPlay> ProofOfPlays { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Explicit table names
      modelBuilder.Entity<Screen>().ToTable("Screens");
      modelBuilder.Entity<Ad>().ToTable("Ads");
      modelBuilder.Entity<Campaign>().ToTable("Campaigns");
      modelBuilder.Entity<CampaignAd>().ToTable("CampaignAd");
      modelBuilder.Entity<CampaignScreen>().ToTable("CampaignScreens");
      modelBuilder.Entity<ProofOfPlay>().ToTable("ProofOfPlays");

      // Campaign → CampaignAd (cascade)
      modelBuilder.Entity<CampaignAd>()
          .HasOne(ca => ca.Campaign)
          .WithMany(c => c.CampaignAds)
          .HasForeignKey(ca => ca.CampaignId)
          .OnDelete(DeleteBehavior.Cascade);

      // Ad → Screen (optional or required depending on your logic)
      modelBuilder.Entity<Ad>()
          .HasOne(a => a.Screen)
          .WithMany() // if Screen has no collection of Ads, otherwise use .WithMany(s => s.Ads)
          .HasForeignKey(a => a.ScreenId)
          .OnDelete(DeleteBehavior.Restrict); // or Cascade if you want


      // CampaignAd → Ad (restrict)
      modelBuilder.Entity<CampaignAd>()
          .HasOne(ca => ca.Ad)
          .WithMany()
          .HasForeignKey(ca => ca.AdId)
          .OnDelete(DeleteBehavior.Restrict);

      // CampaignScreen → Screen (restrict)
      modelBuilder.Entity<CampaignScreen>()
          .HasOne(cs => cs.Screen)
          .WithMany(s => s.CampaignScreens)
          .HasForeignKey(cs => cs.ScreenId)
          .OnDelete(DeleteBehavior.Restrict);

      // CampaignScreen → Campaign (cascade)
      modelBuilder.Entity<CampaignScreen>()
          .HasOne(cs => cs.Campaign)
          .WithMany(c => c.CampaignScreens)
          .HasForeignKey(cs => cs.CampaignId)
          .OnDelete(DeleteBehavior.Cascade);

      // ProofOfPlay → Screen (restrict)
      modelBuilder.Entity<ProofOfPlay>()
          .HasOne(p => p.Screen)
          .WithMany()
          .HasForeignKey(p => p.ScreenId)
          .OnDelete(DeleteBehavior.Restrict);

      // ProofOfPlay → Ad (restrict)
      modelBuilder.Entity<ProofOfPlay>()
          .HasOne(p => p.Ad)
          .WithMany()
          .HasForeignKey(p => p.AdId)
          .OnDelete(DeleteBehavior.Restrict);

      // Unique constraints
      modelBuilder.Entity<CampaignAd>()
          .HasIndex(ca => new { ca.CampaignId, ca.AdId })
          .IsUnique();

      modelBuilder.Entity<CampaignScreen>()
          .HasIndex(cs => new { cs.CampaignId, cs.ScreenId })
          .IsUnique();
    }
  }
}



