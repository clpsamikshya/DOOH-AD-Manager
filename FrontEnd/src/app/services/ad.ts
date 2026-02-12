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




// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs';

// export interface Ad {
//   id: string;          // GUID
//   title: string;
//   mediaUrl: string;
//   durationSeconds: number;
//   mediaType: string;
//   createdAt: string;
//   screenId: string;    // GUID
//   playlistId?: string;
// }

// @Injectable({ providedIn: 'root' })
// export class AdService {

//   private http = inject(HttpClient);

//   private api = 'http://localhost:5044/api/ads';

//   private adsSubject = new BehaviorSubject<Ad[]>([]);
//   readonly ads$ = this.adsSubject.asObservable();


//   loadAds(screenId?: string) {

//     let url = this.api;

//     if (screenId) {
//       url += `?screenId=${screenId}`;
//     }

//     this.http.get<Ad[]>(url).subscribe({
//       next: data => this.adsSubject.next(data),
//       error: err => console.error(err)
//     });
//   }


//   createAd(ad: Partial<Ad>) {
//     return this.http.post<Ad>(this.api, ad);
//   }


//   updateAd(id: string, ad: Partial<Ad>) {
//     return this.http.put<Ad>(`${this.api}/${id}`, ad);
//   }


//   deleteAd(id: string) {
//     return this.http.delete<void>(`${this.api}/${id}`);
//   }
// }




// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs';

// export interface Ad {
//   id: number;
//   title: string;
//   mediaUrl: string;
//   durationSeconds: number;
//   mediaType: string;
//   createdAt: string;
//   screenId: number;
//   playlistId?: number; 
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AdService {

//   private http = inject(HttpClient);
//   private apiUrl = 'http://localhost:5044/api/ads';

//   private adsSubject = new BehaviorSubject<Ad[]>([]);
//   ads$ = this.adsSubject.asObservable();

//   // ✅ Make screenId optional
//   loadAds(screenId?: number) {
//     let url = this.apiUrl;
//     if (screenId != null) {
//       url += `?screenId=${screenId}`; // backend should filter by screenId
//     }
//     this.http.get<Ad[]>(url).subscribe({
//       next: data => this.adsSubject.next(data),
//       error: err => console.error(err)
//     });
//   }

//   createAd(ad: Partial<Ad>) {
//     return this.http.post<Ad>(this.apiUrl, ad);
//   }

//   deleteAd(id: number) {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
// }




// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs';

// export interface Ad {
//   id: string;
//   title: string;
//   mediaUrl?: string;
//   durationSeconds?: number;
//   mediaType?: string;
//   createdAt?: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AdService {

//   private apiUrl = 'http://localhost:5044/api/ads';

//   private adsSubject = new BehaviorSubject<Ad[]>([]);
//   ads$ = this.adsSubject.asObservable();

//   constructor(private http: HttpClient) {
//     this.loadAds();
//   }

//   // GET
//   loadAds() {
//     this.http.get<Ad[]>(this.apiUrl)
//       .subscribe({
//         next: data => this.adsSubject.next(data),
//         error: err => console.error(err)
//       });
//   }

//   // POST
//   addAd(ad: any) {
//   return this.http.post(this.apiUrl, ad);
// }


//   // PUT
//   updateAd(ad: Ad) {
//     this.http.put(`${this.apiUrl}/${ad.id}`, ad)
//       .subscribe(() => this.loadAds());
//   }

//   // DELETE
//   deleteAd(id: string) {
//   return this.http.delete(`${this.apiUrl}/${id}`);
// }

  
// }
