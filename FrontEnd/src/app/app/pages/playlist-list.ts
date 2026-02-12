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


