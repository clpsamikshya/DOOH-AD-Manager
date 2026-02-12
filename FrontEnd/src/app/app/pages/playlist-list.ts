// src/app/app/pages/playlist-list.ts
import { Component, inject } from '@angular/core';
import { CommonModule, NgForOf, AsyncPipe } from '@angular/common';
import { PlaylistService, Playlist } from '../services/playlist';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface ScreenWithPlaylist {
  screenId: string;
  screenName: string;
  playlists: Playlist[];
}

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [CommonModule, NgForOf, AsyncPipe],
  template: `
    <h2>Playlists</h2>

    <div *ngFor="let screen of screens$ | async" class="screen-card">
      <h3>Screen: {{ screen.screenName }}</h3>

      <div *ngIf="screen.playlists.length; else noPlaylist">
        <div *ngFor="let p of screen.playlists" class="card">
          <h4>{{ p.title }}</h4>
          <p>{{ p.mediaUrl }}</p>
          <p>Duration: {{ p.durationSeconds }} sec</p>
          <p>Type: {{ p.mediaType }}</p>
          <button (click)="delete(screen.screenId, p.id)">Delete</button>
        </div>
      </div>
      <ng-template #noPlaylist><p>No playlist</p></ng-template>
    </div>
  `,
  styles: [`
    .screen-card {
      border: 1px solid #ccc;
      margin: 10px 0;
      padding: 10px;
      border-radius: 6px;
    }
    .card {
      background:#f4f4f4;
      padding:10px;
      margin:10px 0;
      border-radius:6px;
    }
  `]
})
export class PlaylistListComponent {

  private service = inject(PlaylistService);
  private http = inject(HttpClient);

  private screensSubject = new BehaviorSubject<ScreenWithPlaylist[]>([]);
  screens$ = this.screensSubject.asObservable();

  constructor() {
    this.loadScreensWithPlaylists();
  }

  loadScreensWithPlaylists() {
    // 1. Load all screens
    this.http.get<any[]>('http://localhost:5044/api/screens')
      .subscribe(screens => {
        const result: ScreenWithPlaylist[] = [];

        screens.forEach(screen => {
          // 2. Load playlist for each screen
          this.service.loadPlaylistByScreen(screen.id)
            .subscribe(playlists => {
              result.push({
                screenId: screen.id,
                screenName: screen.name || 'Unnamed Screen',
                playlists
              });
              this.screensSubject.next([...result]); // update observable dynamically
            });
        });
      });
  }

  delete(screenId: string, adId: string) {
    this.service.deletePlaylist(screenId, adId)
      .subscribe(() => this.loadScreensWithPlaylists());
  }
}


// // src/app/app/pages/playlist-list.ts
// import { Component, inject, OnInit } from '@angular/core';
// import { CommonModule, NgForOf, AsyncPipe } from '@angular/common';
// import { PlaylistService, Playlist } from '../services/playlist';
// import { HttpClient } from '@angular/common/http';

// interface Screen {
//   id: string;
//   name: string;
// }

// @Component({
//   selector: 'app-playlist-list',
//   standalone: true,
//   imports: [CommonModule, NgForOf, AsyncPipe],
//   template: `
//     <h2>Playlists</h2>

//     <div *ngFor="let screen of screens">
//       <h3>Screen: {{ screen.name }}</h3>

//       <div *ngFor="let p of playlists$ | async" class="card">
//         <h4>{{ p.title }}</h4>
//         <p>URL: {{ p.mediaUrl }}</p>
//         <p>Duration: {{ p.durationSeconds }} sec</p>
//         <p>Type: {{ p.mediaType }}</p>
//         <button (click)="delete(screen.id, p.id)">Delete</button>
//       </div>

//       <hr />
//     </div>
//   `,
//   styles: [`
//     .card {
//       background: #f4f4f4;
//       padding: 10px;
//       margin: 10px 0;
//       border-radius: 6px;
//     }
//   `]
// })
// export class PlaylistListComponent implements OnInit {
//   private service = inject(PlaylistService);
//   private http = inject(HttpClient);

//   playlists$ = this.service.playlists$;
//   screens: Screen[] = [];

//   ngOnInit() {
//     // Load all screens dynamically
//     this.http.get<Screen[]>('http://localhost:5044/api/screens')
//       .subscribe({
//         next: screens => {
//           this.screens = screens;

//           // Load playlist for the first screen by default
//           if (screens.length) {
//             this.service.loadPlaylistByScreen(screens[0].id);
//           }
//         },
//         error: err => console.error(err)
//       });
//   }

//   delete(screenId: string, adId: string) {
//     this.service.deletePlaylist(screenId, adId)
//       .subscribe({
//         next: () => this.service.loadPlaylistByScreen(screenId),
//         error: err => console.error(err)
//       });
//   }
// }


// import { Component, inject } from '@angular/core';
// import { CommonModule, NgForOf, AsyncPipe } from '@angular/common';
// import { PlaylistService, Playlist } from '../services/playlist';

// @Component({
//   selector: 'app-playlist-list',
//   standalone: true,
//   imports: [CommonModule, NgForOf, AsyncPipe],
//   template: `
//     <h2>Playlist</h2>

//    <div *ngFor="let screen of screens$ | async">
//   <h3>{{ screen.name }} Playlist</h3>
//   <div *ngFor="let p of screen.playlists">
//     <p>{{ p.title }} - {{ p.durationSeconds }}s</p>
//   </div>
// </div>

//   `,
//   styles: [`
//     .card {
//       background: #f4f4f4;
//       padding: 10px;
//       margin: 10px 0;
//       border-radius: 6px;
//     }
//   `]
// })
// export class PlaylistListComponent {
//   private service = inject(PlaylistService);
//   playlists$ = this.service.playlists$;

//   // Replace with a real screen ID dynamically from your screen list or route
//   private screenId = '634cde94-2a32-4a3d-ba15-53ed2243a583';

//   constructor() {
//     // Load playlist dynamically
//     // this.service.loadPlaylist(this.screenId);
//     this.service.loadAllPlaylists();
//   }
// }




// import { Component, inject } from '@angular/core';
// import { CommonModule, NgForOf, AsyncPipe } from '@angular/common';
// import { PlaylistService } from '../services/playlist';


// @Component({
//   selector: 'app-playlist-list',
//   standalone: true,
//   imports: [CommonModule, NgForOf, AsyncPipe],
//   template: `
//     <h2>Playlists</h2>

//     <div *ngFor="let p of playlists$ | async" class="card">
//       <h3>{{ p.name }}</h3>
//       <p>{{ p.description }}</p>
//       <button (click)="delete(p.id)">Delete</button>
//     </div>
//   `,
//   styles: [`
//     .card {
//       background:#f4f4f4;
//       padding:10px;
//       margin:10px 0;
//       border-radius:6px;
//     }
//   `]
// })
// export class PlaylistListComponent {

//   private service = inject(PlaylistService);

//   playlists$ = this.service.playlists$;

//   constructor() {
//     this.service.loadPlaylists();
//   }

//   delete(id:number){
//     this.service.deletePlaylist(id)
//       .subscribe(()=> this.service.loadPlaylists());
//   }
// }
