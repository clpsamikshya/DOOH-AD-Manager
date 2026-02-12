import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Playlist {
  id: string;
  title: string;
  mediaUrl: string;
  durationSeconds: number;
  mediaType: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private http = inject(HttpClient);

  // Base endpoint for screens
  private api = 'http://localhost:5044/api/screens';

  // Holds playlist data
  private playlistsSubject = new BehaviorSubject<Playlist[]>([]);
  playlists$ = this.playlistsSubject.asObservable();

  // loadAllPlaylists() {
  // this.http.get<any[]>(this.api).subscribe(screens => {
  //   screens.forEach(screen => this.loadPlaylist(screen.id));
  // });

  // Add this method to PlaylistService
loadPlaylistByScreen(screenId: string) {
  return this.http.get<Playlist[]>(`http://localhost:5044/api/screens/${screenId}/playlist`);
}

 deletePlaylist(screenId: string, adId: string) {
    // Delete a campaign ad if needed
    return this.http.delete(`${this.api}/playlist/${screenId}/${adId}`);
  }
}

  // // Load playlist dynamically for a screen
  // loadPlaylist(screenId: string) {
  //   // Call backend without 'at' to get current active campaigns automatically
  //   this.http.get<Playlist[]>(`${this.api}/${screenId}/playlist`).subscribe({
  //     next: (data) => this.playlistsSubject.next(data),
  //     error: (err) => console.error('Error loading playlist:', err),
  //   });
  // }

 






// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs';

// export interface Playlist {
//  id: string;
//   title: string;
//   mediaUrl: string;
//   durationSeconds: number;
//   mediaType: string;
//   createdAt: string;
// }

// @Injectable({ providedIn: 'root' })
// export class PlaylistService {
//   private http = inject(HttpClient);
//   private api = 'http://localhost:5044/api/playlists';

//   private playlistsSubject = new BehaviorSubject<Playlist[]>([]);
//   playlists$ = this.playlistsSubject.asObservable();

//   loadPlaylists() {
//     this.http.get<Playlist[]>(this.api).subscribe({
//       next: data => this.playlistsSubject.next(data),
//       error: err => console.error(err)
//     });
//   }

 
//   deletePlaylist(id: string) {
//     return this.http.delete(`${this.api}/${id}`);
//   }
// }

