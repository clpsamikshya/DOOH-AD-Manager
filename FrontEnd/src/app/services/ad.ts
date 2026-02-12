import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Ad {
  id: string;
  title: string;
  mediaUrl: string;
  durationSeconds: number;
  mediaType: string;
  createdAt: string;
  screenId: string; // string GUID
  playlistId?: string;
}

@Injectable({ providedIn: 'root' })
export class AdService {
  private http = inject(HttpClient);
  private api = 'http://localhost:5044/api/ads';

  private adsSubject = new BehaviorSubject<Ad[]>([]);
  readonly ads$ = this.adsSubject.asObservable();

  loadAds() {
    this.http.get<Ad[]>(this.api).subscribe({
      next: data => this.adsSubject.next(data),
      error: err => console.error('Failed to load ads', err)
    });
  }

  createAd(ad: Omit<Ad, 'id'>) {
    return this.http.post<Ad>(this.api, ad);
  }

  updateAd(id: string, ad: Partial<Ad>) {
    return this.http.put<Ad>(`${this.api}/${id}`, ad);
  }

  deleteAd(id: string) {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}




