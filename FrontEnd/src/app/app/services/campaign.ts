import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Campaign {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  campaignAds?: CampaignAd[];
  campaignScreens?: CampaignScreen[];
}

export interface CampaignAd {
  id: string;
  campaignId: string;
  adId: string;
  playOrder: number;
  ad?: {
    id: string;
    title: string;
    mediaUrl: string;
    durationSeconds: number;
    mediaType: string;
  };
}

export interface CampaignScreen {
  id: string;
  campaignId: string;
  screenId: string;
  screenName?: string; // optional for mapping
}

@Injectable({ providedIn: 'root' })
export class CampaignService {
  private http = inject(HttpClient);
  private api = 'http://localhost:5044/api/campaigns';

  private campaignsSubject = new BehaviorSubject<Campaign[]>([]);
  campaigns$ = this.campaignsSubject.asObservable();

  loadCampaigns(): void {
    this.http.get<Campaign[]>(this.api).subscribe({
      next: data => this.campaignsSubject.next(data),
      error: err => console.error('Failed to load campaigns:', err),
    });
  }

  deleteCampaign(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}



