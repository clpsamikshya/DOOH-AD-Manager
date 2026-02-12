import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ad, AdService } from '../../services/ad';
import { Screen, ScreenService } from '../../services/screen';

@Component({
  selector: 'app-ad-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ad-list.html'
})
export class AdListComponent {
  private adService = inject(AdService);
  private screenService = inject(ScreenService);

  ads: Ad[] = [];
  screens: Screen[] = [];

  editing: Partial<Ad> | null = null;
  isEditing = false;

  constructor() {
    // Load screens first
    this.screenService.screens$.subscribe(s => this.screens = s);
    this.screenService.loadScreens();

    // Load ads
    this.adService.ads$.subscribe(a => this.ads = a);
    this.adService.loadAds();
  }

  addAd() {
    this.editing = {
      title: '',
      mediaUrl: '',
      durationSeconds: 0,
      mediaType: '',
      createdAt: new Date().toISOString(),
      screenId: this.screens.length ? this.screens[0].id : '' // default to first screen
    };
    this.isEditing = true;
  }

  editAd(ad: Ad) {
    this.editing = { ...ad };
    this.isEditing = true;
  }

  saveAd() {
    if (!this.editing) return;

    if (!this.editing.id) {
      this.adService.createAd(this.editing as Omit<Ad, 'id'>).subscribe(() => {
        this.adService.loadAds();
        this.cancel();
      });
    } else {
      this.adService.updateAd(this.editing.id, this.editing).subscribe(() => {
        this.adService.loadAds();
        this.cancel();
      });
    }
  }

  deleteAd(id: string) {
    this.adService.deleteAd(id).subscribe(() => this.adService.loadAds());
  }

  cancel() {
    this.editing = null;
    this.isEditing = false;
  }

  getScreenName(id: string) {
    const screen = this.screens.find(s => s.id === id);
    return screen ? screen.name : 'Unknown';
  }
}



// import { Component, Input, inject, OnChanges, SimpleChanges } from '@angular/core';
// import { CommonModule, NgForOf, NgIf, AsyncPipe } from '@angular/common';
// import { AdService, Ad } from '../../services/ad';

// @Component({
//   selector: 'app-ad-list',
//   standalone: true,
//   imports: [CommonModule, NgForOf, NgIf, AsyncPipe],
//   template: `
//     <h2>Ads</h2>
//     <div *ngIf="ads$ | async as ads; else loading">
//       <div *ngIf="ads.length===0" class="empty">No ads found.</div>
//       <div *ngFor="let ad of ads" class="ad-card">
//         <h3>{{ ad.title }}</h3>
//         <p>Type: {{ ad.mediaType }}</p>
//         <p>Duration: {{ ad.durationSeconds }} sec</p>
//         <img *ngIf="ad.mediaType==='Image'" [src]="ad.mediaUrl" width="200" />
//         <button (click)="delete(ad.id)">Delete</button>
//       </div>
//     </div>
//     <ng-template #loading><p>Loading ads...</p></ng-template>
//   `,
//   styles: [`
//     .ad-card { padding:10px; margin:10px 0; background:#e6f2ff; border-radius:6px; }
//     .empty { color:gray; font-style:italic; }
//     button { padding:5px 10px; background:red; color:white; border:none; border-radius:4px; cursor:pointer; }
//   `]
// })
// export class AdListComponent implements OnChanges {
//   private adService = inject(AdService);
//   ads$ = this.adService.ads$;
//   @Input() screenId: number | null = null;

//   constructor() { this.loadAds(); }

//   ngOnChanges(changes: SimpleChanges) {
//     if (changes['screenId']) this.loadAds();
//   }

//   loadAds() { this.adService.loadAds(this.screenId ?? undefined); }
//   delete(id: number) { this.adService.deleteAd(id).subscribe({ next: () => this.loadAds() }); }
// }



// import { Component, Input, inject, OnChanges, SimpleChanges } from '@angular/core';
// import { CommonModule, AsyncPipe, NgForOf, NgIf } from '@angular/common';
// import { AdService, Ad } from '../../services/ad';

// @Component({
//   selector: 'app-ad-list',
//   standalone: true,
//   imports: [CommonModule, AsyncPipe, NgForOf, NgIf],
//   template: `
//     <h2>Advertisements</h2>

//     <div *ngIf="ads$ | async as ads; else loading">
//       <div *ngIf="ads.length === 0" class="empty">
//         No ads found for this screen.
//       </div>

//       <div *ngFor="let ad of ads" class="ad-card">
//         <h3>{{ ad.title }}</h3>
//         <p>Type: {{ ad.mediaType }}</p>
//         <p>Duration: {{ ad.durationSeconds }} sec</p>

//         <img *ngIf="ad.mediaType === 'Image'" [src]="ad.mediaUrl" width="200" />

//         <button (click)="delete(ad.id)">Delete</button>
//       </div>
//     </div>

//     <ng-template #loading>
//       <p>Loading ads...</p>
//     </ng-template>
//   `,
//   styles: [`
//     .ad-card {
//       padding: 15px;
//       margin-bottom: 15px;
//       background: #e6f2ff;
//       border-radius: 8px;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//     }

//     .ad-card h3 {
//       margin: 0 0 8px;
//     }

//     button {
//       margin-top: 10px;
//       padding: 6px 12px;
//       border: none;
//       background: #ff4444;
//       color: white;
//       border-radius: 4px;
//       cursor: pointer;
//     }

//     button:hover {
//       background: #cc0000;
//     }

//     .empty {
//       color: gray;
//       font-style: italic;
//     }
//   `]
// })
// export class AdListComponent implements OnChanges {
//   private adService = inject(AdService);

//   // Observable of ads for AsyncPipe
//   ads$ = this.adService.ads$;

//   // ✅ Input for filtering ads by screen
//   @Input() screenId: number | null = null;

//   constructor() {
//     // Initial load
//     this.loadAds();
//   }

//   // Called whenever input changes
//   ngOnChanges(changes: SimpleChanges) {
//     if (changes['screenId']) {
//       this.loadAds();
//     }
//   }

//   // Load ads (filtered if screenId exists)
//   loadAds() {
//     if (this.screenId != null) {
//       this.adService.loadAds(this.screenId);
//     } else {
//       this.adService.loadAds();
//     }
//   }

//   delete(id: number) {
//     this.adService.deleteAd(id).subscribe({
//       next: () => this.loadAds(),
//       error: err => console.error('Failed to delete ad:', err)
//     });
//   }
// }


// import { Component, inject } from '@angular/core';
// import { CommonModule, AsyncPipe, NgForOf, NgIf } from '@angular/common';
// import { AdService, Ad } from '../../services/ad';

// @Component({
//   selector: 'app-ad-list',
//   standalone: true,
//   imports: [CommonModule, AsyncPipe, NgForOf, NgIf],
//   template: `
//     <h2>All Advertisements</h2>

//     <div *ngIf="ads$ | async as ads; else loading">

//       <div *ngIf="ads.length === 0" class="empty">
//         No ads found.
//       </div>

//       <div *ngFor="let ad of ads" class="ad-card">
//         <h3>{{ ad.title }}</h3>
//         <p>Type: {{ ad.mediaType }}</p>
//         <p>Duration: {{ ad.durationSeconds }} sec</p>

//         <img *ngIf="ad.mediaType === 'Image'" [src]="ad.mediaUrl" width="200" />

//         <button (click)="delete(ad.id)">Delete</button>
//       </div>

//     </div>

//     <ng-template #loading>
//       <p>Loading ads...</p>
//     </ng-template>
//   `,
//   styles: [`
//     .ad-card {
//       padding: 15px;
//       margin-bottom: 15px;
//       background: #e6f2ff;
//       border-radius: 8px;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//     }

//     .ad-card h3 {
//       margin: 0 0 8px;
//     }

//     button {
//       margin-top: 10px;
//       padding: 6px 12px;
//       border: none;
//       background: #ff4444;
//       color: white;
//       border-radius: 4px;
//       cursor: pointer;
//     }

//     button:hover {
//       background: #cc0000;
//     }

//     .empty {
//       color: gray;
//       font-style: italic;
//     }
//   `]
// })
// export class AdListComponent {
//   private adService = inject(AdService);

//   // Observable of ads for AsyncPipe
//   ads$ = this.adService.ads$;

//   constructor() {
//     // Load ads immediately on component init
//     this.adService.loadAds();
//   }

//   delete(id: number) {
//     // Call service delete method
//     this.adService.deleteAd(id).subscribe({
//       next: () => {
//         // Reload ads after deletion
//         this.adService.loadAds();
//       },
//       error: err => console.error('Failed to delete ad:', err)
//     });
//   }
// }



// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AsyncPipe } from '@angular/common';

// import { AdService, Ad } from '../../services/ad';

// @Component({
//   selector: 'app-ad-list',
//   standalone: true,
//   imports: [CommonModule, AsyncPipe],
//   template: `
//     <h2>All Advertisements</h2>

//     <div *ngIf="ads$ | async as ads; else loading">

//       <div *ngIf="ads.length === 0" class="empty">
//         No ads found.
//       </div>

//       <div
//         *ngFor="let ad of ads"
//         class="ad-card"
//       >
//         <h3>{{ ad.title }}</h3>

//         <p>Type: {{ ad.mediaType }}</p>
//         <p>Duration: {{ ad.durationSeconds }} sec</p>

//         <img
//           *ngIf="ad.mediaType === 'Image'"
//           [src]="ad.mediaUrl"
//           width="200"
//         />

//         <button (click)="delete(ad.id)">
//           Delete
//         </button>
//       </div>

//     </div>

//     <ng-template #loading>
//       <p>Loading ads...</p>
//     </ng-template>
//   `,
//   styles: [`
//     .ad-card {
//       padding: 15px;
//       margin-bottom: 15px;
//       background: #e6f2ff;
//       border-radius: 8px;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//     }

//     .ad-card h3 {
//       margin: 0 0 8px;
//     }

//     button {
//       margin-top: 10px;
//       padding: 6px 12px;
//       border: none;
//       background: #ff4444;
//       color: white;
//       border-radius: 4px;
//       cursor: pointer;
//     }

//     button:hover {
//       background: #cc0000;
//     }

//     .empty {
//       color: gray;
//       font-style: italic;
//     }
//   `]
// })
// export class AdListComponent {

//   // Modern Angular 20 DI
//   private adService = inject(AdService);

//   // Observable from backend
//   ads$ = this.adService.ads$;

//   delete(id: string) {
//     this.adService.deleteAd(id).subscribe({
//       next: () => {
//         this.adService.loadAds(); // reload after delete
//       },
//       error: err => console.error(err)
//     });
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { AdService, Ad } from '../../services/ad';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-ad-list',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <h2>Ad List</h2>

//     <ul>
//       <li *ngFor="let ad of ads">
//         {{ ad.title }} - {{ ad.mediaType }}
//       </li>
//     </ul>
//   `
// })
// export class AdListComponent implements OnInit {

//   ads: Ad[] = [];

//   constructor(private adService: AdService) {}

//   ngOnInit() {

//     this.adService.loadAds();

//     this.adService.ads$.subscribe(data => {
//       this.ads = data;
//     });
//   }
// }
