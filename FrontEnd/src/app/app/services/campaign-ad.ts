import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CampaignAd {
  id: string;          // ID of the campaign-ad record
  campaignId: string;  // ID of the campaign
  adId: string;        // ID of the ad
  playOrder: number;   // Play order of the ad within the campaign
  ad?: {
    id: string;
    title: string;
    mediaUrl: string;
    durationSeconds: number;
    mediaType: string;
  };
}

@Injectable({ providedIn: 'root' })
export class CampaignAdService {
  private http = inject(HttpClient);
  private api = 'http://localhost:5044/api/campaign-ads';

  private campaignAdsSubject = new BehaviorSubject<CampaignAd[]>([]);
  campaignAds$ = this.campaignAdsSubject.asObservable();

  /** Load all campaign ads or filter by campaignId */
  loadCampaignAds(campaignId?: string) {
    let url = this.api;
    if (campaignId) url += `?campaignId=${campaignId}`;
    this.http.get<CampaignAd[]>(url).subscribe({
      next: data => this.campaignAdsSubject.next(data),
      error: err => console.error('Failed to load campaign ads:', err)
    });
  }

  /** Delete a specific campaign-ad */
  deleteCampaignAd(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  /** Add a new campaign-ad */
  addCampaignAd(campaignAd: Partial<CampaignAd>): Observable<CampaignAd> {
    return this.http.post<CampaignAd>(this.api, campaignAd);
  }

  /** Update an existing campaign-ad */
  updateCampaignAd(id: string, campaignAd: Partial<CampaignAd>): Observable<CampaignAd> {
    return this.http.put<CampaignAd>(`${this.api}/${id}`, campaignAd);
  }
}
