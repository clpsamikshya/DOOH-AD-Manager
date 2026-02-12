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

 
  // Add this method to PlaylistService
loadPlaylistByScreen(screenId: string) {
  return this.http.get<Playlist[]>(`http://localhost:5044/api/screens/${screenId}/playlist`);
}

 deletePlaylist(screenId: string, adId: string) {
    // Delete a campaign ad if needed
    return this.http.delete(`${this.api}/playlist/${screenId}/${adId}`);
  }
}


