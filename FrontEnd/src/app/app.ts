import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <header class="header">
      <h1>DOOH Ad Manager</h1>

      <nav class="nav">
        <a routerLink="/screens" routerLinkActive="active">Screens</a>
        <a routerLink="/ads" routerLinkActive="active">Ads</a>
        <a routerLink="/playlists" routerLinkActive="active">Playlists</a>
        <a routerLink="/campaigns" routerLinkActive="active">Campaigns</a>
        <a routerLink="/proof-of-play" routerLinkActive="active">Proof of Play</a>
      </nav>
    </header>

    <main class="main">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .header {
      background: #032346;
      color: white;
      padding: 15px;
    }

    .nav {
      margin-top: 10px;
      display: flex;
      gap: 15px;
    }

    .nav a {
      color: white;
      text-decoration: none;
      padding: 5px 10px;
      border-radius: 4px;
    }

    .nav a:hover {
      background: rgba(255,255,255,0.2);
    }

    .active {
      background: #0d6efd;
    }

    .main {
      padding: 15px;
    }
  `]
})
export class AppComponent {}


//  <header class="header">
//       <h1>DOOH Ad Manager</h1>

//       <nav class="nav">
//         <a routerLink="/screens" routerLinkActive="active">Screens</a>
//         
//         <a routerLink="/playlists" routerLinkActive="active">Playlists</a>
//         <a routerLink="/campaigns" routerLinkActive="active">Campaigns</a>
//       </nav>
//     </header>

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet],
//   template: `
//     <header style="padding: 10px; background: #032346; color: white;">
//       <h1>DOOH Ad Manager</h1>
//     </header>
//     <main style="padding: 10px;">
//       <router-outlet></router-outlet>
//     </main>
//   `
// })
// export class AppComponent {}



// import { Component, inject } from '@angular/core';
// import { CommonModule, AsyncPipe, NgForOf, NgIf } from '@angular/common';
// import { ScreenService, Screen } from './services/screen';
// import { AdService, Ad } from './services/ad';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, NgForOf, NgIf, AsyncPipe],
//   template: `
//     <h1>DOOH Ad Manager</h1>

//     <div class="dashboard">
//       <!-- Left: Screens -->
//       <div class="screens">
//         <h3>Screens</h3>
//         <div *ngIf="screens$ | async as screens; else loadingScreens">
//           <div *ngFor="let screen of screens" 
//                class="screen-card" 
//                [class.selected]="screen.id === selectedScreenId"
//                (click)="selectScreen(screen.id)">
//             <h4>{{ screen.name }}</h4>
//             <p>{{ screen.location }}</p>
//             <p>Status: {{ screen.status }}</p>
//             <p>Resolution: {{ screen.resolution }}</p>
//           </div>
//         </div>
//         <ng-template #loadingScreens>
//           <p>Loading screens...</p>
//         </ng-template>
//       </div>

//       <!-- Right: Ads -->
//       <div class="ads">
//         <h3>Ads</h3>
//         <div *ngIf="ads$ | async as ads; else loadingAds">
//           <div *ngIf="filteredAds(ads).length > 0; else noAds">
//             <div *ngFor="let ad of filteredAds(ads)" class="ad-card">
//               <h4>{{ ad.title }}</h4>
//               <p>Type: {{ ad.mediaType }} | Duration: {{ ad.durationSeconds }}s</p>
//               <img *ngIf="ad.mediaType === 'Image'" [src]="ad.mediaUrl" width="150" />
//               <button (click)="deleteAd(ad.id)">Delete</button>
//             </div>
//           </div>
//           <ng-template #noAds>
//             <p class="empty">No ads for this screen.</p>
//           </ng-template>
//         </div>
//         <ng-template #loadingAds>
//           <p>Loading ads...</p>
//         </ng-template>
//       </div>
//     </div>
//   `,
//   styles: [`
//     h1 { text-align:center; margin:20px 0; color:#006666; }

//     .dashboard { display:flex; gap:20px; padding:20px; }

//     .screens { width:250px; border-right:1px solid #ccc; padding-right:10px; }
//     .screen-card { padding:10px; margin-bottom:10px; border:1px solid #007acc; border-radius:6px; background:#e6f2ff; cursor:pointer; }
//     .screen-card.selected { background:#007acc; color:white; }

//     .ads { flex:1; }
//     .ad-card { border:1px solid #007acc; border-radius:6px; padding:8px; margin-bottom:8px; background:#f0f8ff; }
//     button { margin-top:4px; padding:4px 10px; cursor:pointer; background:#ff4444; color:white; border:none; border-radius:4px; }
//     button:hover { background:#cc0000; }
//     .empty { color:gray; font-style:italic; }
//   `]
// })
// export class AppComponent {
//   private screenService = inject(ScreenService);
//   private adService = inject(AdService);

//   screens$ = this.screenService.screens$;
//   ads$ = this.adService.ads$;

//   selectedScreenId: number | null = null;

//   constructor() {
//     this.screenService.loadScreens();
//     this.adService.loadAds();
//   }

//   selectScreen(screenId: number) {
//     this.selectedScreenId = screenId;
//   }

//   filteredAds(ads: Ad[]): Ad[] {
//     return this.selectedScreenId
//       ? ads.filter(ad => ad.screenId === this.selectedScreenId)
//       : ads;
//   }

//   deleteAd(id: number) {
//     this.adService.deleteAd(id).subscribe(() => this.adService.loadAds());
//   }
// }



// import { Component } from '@angular/core';
// import { RouterOutlet, RouterModule } from '@angular/router';


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   template: `
//    <nav>
//   <a routerLink="" routerLinkActive="active">Dashboard</a> |
//   <a routerLink="create-ad" routerLinkActive="active">Create Ad</a> |
//   <a routerLink="ad-list" routerLinkActive="active">Ad List</a> |
//   <a routerLink="settings" routerLinkActive="active">Settings</a>
// </nav>
//     <router-outlet></router-outlet>
//   `,
//   styles: [`
//     nav { margin-bottom: 20px; font-size: 16px; }
//     nav a { margin-right: 15px; text-decoration: none; color: teal; }
//     nav a.active { font-weight: bold; text-decoration: underline; }
//   `]
// })
// export class AppComponent {}
