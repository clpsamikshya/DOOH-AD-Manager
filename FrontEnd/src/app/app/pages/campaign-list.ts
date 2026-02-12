import { Component, inject } from '@angular/core';
import { CommonModule, NgForOf, AsyncPipe } from '@angular/common';
import { CampaignService, Campaign } from '../services/campaign';
import { CampaignAdService, CampaignAd } from '../services/campaign-ad';
import { ScreenService } from '../../services/screen';


@Component({
  standalone: true,
  selector: 'app-campaign-list',
  imports: [CommonModule, NgForOf, AsyncPipe],
  template: `
    <h2>Campaigns</h2>

    <div *ngFor="let c of campaigns$ | async" class="card">
      <h3>{{ c.name }}</h3>
      <p>Start time (UTC): {{ c.startTime }}</p>
      <p>End time (UTC): {{ c.endTime }}</p>

      <div *ngIf="c.campaignScreens?.length">
        <p *ngFor="let cs of c.campaignScreens">
          Screen: {{ screenIdNameMap[cs.screenId] || cs.screenId }}
        </p>
      </div>

      <div *ngIf="c.campaignAds?.length">
        <p *ngFor="let ad of getAdsForCampaign(c)">
          Ad: {{ ad.title }} (Order: {{ ad.playOrder }})
        </p>
      </div>

      <button (click)="deleteCampaignAndAds(c.id)">Delete Campaign</button>
    </div>
  `
})
export class CampaignListComponent {
  private campaignService = inject(CampaignService);
  private campaignAdService = inject(CampaignAdService);
  private screenService = inject(ScreenService);

  campaigns$ = this.campaignService.campaigns$;
  campaignAds: CampaignAd[] = [];
  screenIdNameMap: Record<string, string> = {}; // Map screenId → screenName

  constructor() {
    // Load campaigns
    this.campaignService.loadCampaigns();

    // Load campaign ads
    this.campaignAdService.campaignAds$.subscribe(data => this.campaignAds = data);
    this.campaignAdService.loadCampaignAds();

    // Load screens and build map
    this.screenService.screens$.subscribe(data => {
      this.screenIdNameMap = {};
      data.forEach(s => this.screenIdNameMap[s.id] = s.name);
    });
    this.screenService.loadScreens();
  }

  getAdsForCampaign(c: Campaign) {
    return (c.campaignAds || [])
      .map(ca => ({
        title: ca.ad?.title || 'Unknown',
        playOrder: ca.playOrder
      }))
      .sort((a, b) => a.playOrder - b.playOrder);
  }

  deleteCampaignAndAds(campaignId: string) {
    const adsToDelete = (this.campaignAds || [])
      .filter(ca => ca.campaignId === campaignId)
      .sort((a, b) => a.playOrder - b.playOrder);

    if (adsToDelete.length === 0) {
      this.campaignService.deleteCampaign(campaignId).subscribe(() => this.reloadData());
      return;
    }

    let deletedCount = 0;
    adsToDelete.forEach(ad => {
      this.campaignAdService.deleteCampaignAd(ad.id).subscribe({
        next: () => {
          deletedCount++;
          if (deletedCount === adsToDelete.length) {
            this.campaignService.deleteCampaign(campaignId).subscribe(() => this.reloadData());
          }
        },
        error: err => console.error(`Failed to delete campaign ad ${ad.id}:`, err)
      });
    });
  }

  private reloadData() {
    this.campaignService.loadCampaigns();
    this.campaignAdService.loadCampaignAds();
    this.screenService.loadScreens();
  }
}




// import { Component, inject } from '@angular/core';
// import { CommonModule, NgForOf, AsyncPipe } from '@angular/common';
// import { CampaignService } from '../services/campaign';


// @Component({
//   standalone:true,
//   selector:'app-campaign-list',
//   imports:[CommonModule,NgForOf,AsyncPipe],
//   template:`

//   <h2>Campaigns</h2>

//   <div *ngFor="let c of campaigns$ | async" class="card">

//     <h3>{{c.name}}</h3>

//     <p>Screen: {{c.screenId}}</p>
//     <p>Playlist: {{c.playlistId}}</p>
//     <p>{{c.startTime}} → {{c.endTime}}</p>

//     <button (click)="delete(c.id)">Delete</button>

//   </div>
//   `
// })
// export class CampaignListComponent{

//   private service = inject(CampaignService);

//   campaigns$ = this.service.campaigns$;

//   constructor(){
//     this.service.load();
//   }

//   delete(id:number){
//     this.service.delete(id)
//       .subscribe(()=>this.service.load());
//   }
// }


// // import { Component, inject } from '@angular/core';
// // import { CommonModule, NgForOf, AsyncPipe } from '@angular/common';
// // import { CampaignService } from '../services/campaign';

// // @Component({
// //   standalone:true,
// //   selector:'app-campaign-list',
// //   imports:[CommonModule,NgForOf,AsyncPipe],
// //   template:`

// //   <h2>Campaigns</h2>

// //   <div *ngFor="let c of campaigns$ | async" class="card">

// //     <h3>{{c.name}}</h3>

// //     <p>Screen: {{c.screenId}}</p>
// //     <p>Playlist: {{c.playlistId}}</p>
// //     <p>{{c.startTime}} → {{c.endTime}}</p>

// //     <button (click)="delete(c.id)">Delete</button>

// //   </div>
// //   `
// // })
// // export class CampaignListComponent{

// //   private service = inject(CampaignService);

// //   campaigns$ = this.service.campaigns$;

// //   constructor(){
// //     this.service.load();
// //   }

// //   delete(id:number){
// //     this.service.delete(id)
// //       .subscribe(()=>this.service.load());
// //   }
// // }


// // import { Component, inject } from '@angular/core';
// // import { CommonModule, NgForOf, NgIf, AsyncPipe } from '@angular/common';
// // import { CampaignService } from '../services/campaign';


// // @Component({
// //   selector: 'app-campaign-list',
// //   standalone: true,
// //   imports: [CommonModule, NgForOf, NgIf, AsyncPipe],
// //   template: `
// //     <h2>Campaigns</h2>
// //     <div *ngIf="campaigns$ | async as campaigns">
// //       <div *ngIf="campaigns.length === 0">No campaigns found.</div>
// //       <div *ngFor="let c of campaigns">
// //         <h3>{{ c.name }}</h3>
// //         <p>From: {{ c.startTime }} To: {{ c.endTime }}</p>
// //         <button (click)="delete(c.id)">Delete</button>
// //       </div>
// //     </div>
// //   `
// // })
// // export class CampaignListComponent {
// //   private service = inject(CampaignService);
// //   campaigns$ = this.service.campaigns$;

// //   constructor() { this.service.loadCampaigns(); }

// //   delete(id: number) { this.service.deleteCampaign(id).subscribe({ next: () => this.service.loadCampaigns() }); }
// // }
