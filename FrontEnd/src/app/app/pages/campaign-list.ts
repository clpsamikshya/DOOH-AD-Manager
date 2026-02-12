import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CampaignService, Campaign } from '../services/campaign';
import { CampaignAdService, CampaignAd } from '../services/campaign-ad';
import { ScreenService } from '../../services/screen';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Campaigns</h2>

    <div>
      <input [(ngModel)]="newCampaignName" placeholder="Campaign name" />
      <button (click)="addCampaign()">Add Campaign</button>
    </div>

    <div *ngFor="let c of campaigns$ | async">
      <h3>{{ c.name }}</h3>
      <p>Start: {{ c.startTime }}</p>
      <p>End: {{ c.endTime }}</p>

      <div *ngIf="c.campaignAds?.length">
        <p *ngFor="let ca of c.campaignAds">
          Ad: {{ ca.ad?.title || 'Unknown' }} (Order: {{ ca.playOrder }})
        </p>
      </div>

      <button (click)="deleteCampaign(c.id)">Delete</button>
    </div>
  `
})
export class CampaignListComponent {
  private campaignService = inject(CampaignService);
  private http = inject(HttpClient);
  private screenService = inject(ScreenService);
  private campaignAdService = inject(CampaignAdService);

  campaigns$ = this.campaignService.campaigns$;
  newCampaignName = '';

  constructor() {
    this.campaignService.loadCampaigns();
  }

  addCampaign() {
    if (!this.newCampaignName.trim()) return;

    const newCampaign: Partial<Campaign> = {
      name: this.newCampaignName,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600_000).toISOString() // 1 hour later
    };

    this.http.post<Campaign>('http://localhost:5044/api/campaigns', newCampaign)
      .subscribe({
        next: () => {
          this.campaignService.loadCampaigns();
          this.newCampaignName = '';
        },
        error: (err: any) => console.error('Failed to add campaign:', err)
      });
  }

  deleteCampaign(id: string) {
    this.campaignService.deleteCampaign(id).subscribe(() => this.campaignService.loadCampaigns());
  }
}



// import { Component, inject } from '@angular/core';
// import { CommonModule, NgForOf, AsyncPipe } from '@angular/common';
// import { CampaignService, Campaign } from '../services/campaign';
// import { CampaignAdService, CampaignAd } from '../services/campaign-ad';
// import { ScreenService } from '../../services/screen';


// @Component({
//   standalone: true,
//   selector: 'app-campaign-list',
//   imports: [CommonModule, NgForOf, AsyncPipe],
//   template: `
//     <h2>Campaigns</h2>

//     <div *ngFor="let c of campaigns$ | async" class="card">
//       <h3>{{ c.name }}</h3>
//       <p>Start time (UTC): {{ c.startTime }}</p>
//       <p>End time (UTC): {{ c.endTime }}</p>

//       <div *ngIf="c.campaignScreens?.length">
//         <p *ngFor="let cs of c.campaignScreens">
//           Screen: {{ screenIdNameMap[cs.screenId] || cs.screenId }}
//         </p>
//       </div>

//       <div *ngIf="c.campaignAds?.length">
//         <p *ngFor="let ad of getAdsForCampaign(c)">
//           Ad: {{ ad.title }} (Order: {{ ad.playOrder }})
//         </p>
//       </div>

//       <button (click)="deleteCampaignAndAds(c.id)">Delete Campaign</button>
//     </div>
//   `
// })
// export class CampaignListComponent {
//   private campaignService = inject(CampaignService);
//   private campaignAdService = inject(CampaignAdService);
//   private screenService = inject(ScreenService);

//   campaigns$ = this.campaignService.campaigns$;
//   campaignAds: CampaignAd[] = [];
//   screenIdNameMap: Record<string, string> = {}; // Map screenId → screenName

//   constructor() {
//     // Load campaigns
//     this.campaignService.loadCampaigns();

//     // Load campaign ads
//     this.campaignAdService.campaignAds$.subscribe(data => this.campaignAds = data);
//     this.campaignAdService.loadCampaignAds();

//     // Load screens and build map
//     this.screenService.screens$.subscribe(data => {
//       this.screenIdNameMap = {};
//       data.forEach(s => this.screenIdNameMap[s.id] = s.name);
//     });
//     this.screenService.loadScreens();
//   }

//   getAdsForCampaign(c: Campaign) {
//     return (c.campaignAds || [])
//       .map(ca => ({
//         title: ca.ad?.title || 'Unknown',
//         playOrder: ca.playOrder
//       }))
//       .sort((a, b) => a.playOrder - b.playOrder);
//   }

//   deleteCampaignAndAds(campaignId: string) {
//     const adsToDelete = (this.campaignAds || [])
//       .filter(ca => ca.campaignId === campaignId)
//       .sort((a, b) => a.playOrder - b.playOrder);

//     if (adsToDelete.length === 0) {
//       this.campaignService.deleteCampaign(campaignId).subscribe(() => this.reloadData());
//       return;
//     }

//     let deletedCount = 0;
//     adsToDelete.forEach(ad => {
//       this.campaignAdService.deleteCampaignAd(ad.id).subscribe({
//         next: () => {
//           deletedCount++;
//           if (deletedCount === adsToDelete.length) {
//             this.campaignService.deleteCampaign(campaignId).subscribe(() => this.reloadData());
//           }
//         },
//         error: err => console.error(`Failed to delete campaign ad ${ad.id}:`, err)
//       });
//     });
//   }

//   private reloadData() {
//     this.campaignService.loadCampaigns();
//     this.campaignAdService.loadCampaignAds();
//     this.screenService.loadScreens();
//   }
// }





