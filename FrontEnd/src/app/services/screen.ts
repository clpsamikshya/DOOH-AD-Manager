import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Screen {
  id: string; // GUID
  name: string;
  location: string;
  resolution: string;
  status: 'active' | 'inactive';
}

@Injectable({ providedIn: 'root' })
export class ScreenService {
  private http = inject(HttpClient);
  private api = 'http://localhost:5044/api/screens';

  private screensSubject = new BehaviorSubject<Screen[]>([]);
  readonly screens$ = this.screensSubject.asObservable();

  loadScreens() {
    this.http.get<Screen[]>(this.api).subscribe({
      next: data => this.screensSubject.next(data),
      error: err => console.error('Failed to load screens', err)
    });
  }

  createScreen(screen: Omit<Screen, 'id'>) {
    return this.http.post<Screen>(this.api, screen);
  }

  updateScreen(id: string, screen: Partial<Screen>) {
    return this.http.put<Screen>(`${this.api}/${id}`, screen);
  }

  deleteScreen(id: string) {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}


// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, tap } from 'rxjs';

// export interface Screen {
//   id: string;            // ✅ GUID
//   name: string;
//   location: string;
//   resolution?: string;
//   status?: 'active' | 'inactive';
// }


// @Injectable({
//   providedIn: 'root'
// })
// export class ScreenService {

//   private http = inject(HttpClient);

//   private api = 'http://localhost:5044/api/screens';

//   private screensSubject = new BehaviorSubject<Screen[]>([]);
//   public screens$ = this.screensSubject.asObservable();

//   loadScreens(): void {

//     this.http.get<Screen[]>(this.api).subscribe({
//       next: data => this.screensSubject.next(data),
//       error: err => console.error('Load screens failed:', err)
//     });
//   }


//   createScreen(screen: Partial<Screen>): Observable<Screen> {

//     return this.http.post<Screen>(this.api, screen).pipe(


//       tap(newScreen => {

//         const current = this.screensSubject.value;

//         this.screensSubject.next([...current, newScreen]);

//       })
//     );
//   }


//   updateScreen(id: string, screen: Partial<Screen>): Observable<Screen> {

//     return this.http.put<Screen>(`${this.api}/${id}`, screen).pipe(

     
//       tap(updated => {

//         const updatedList = this.screensSubject.value.map(s =>
//           s.id === id ? updated : s
//         );

//         this.screensSubject.next(updatedList);

//       })
//     );
//   }


//   deleteScreen(id: string): Observable<void> {

//     return this.http.delete<void>(`${this.api}/${id}`).pipe(

//       tap(() => {

//         const filtered = this.screensSubject.value.filter(
//           s => s.id !== id
//         );

//         this.screensSubject.next(filtered);

//       })
//     );
//   }

// }



// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs';

// export interface Screen {
//   id: number;
//   name: string;
//   location: string;
//   resolution: string;
//   status: 'active' | 'inactive';
// }

// @Injectable({ providedIn: 'root' })
// export class ScreenService {
//   private http = inject(HttpClient);
//   private api = 'http://localhost:5044/api/screens';

//   private screensSubject = new BehaviorSubject<Screen[]>([]);
//   readonly screens$ = this.screensSubject.asObservable();

//   loadScreens() {
//     this.http.get<Screen[]>(this.api).subscribe({
//       next: data => this.screensSubject.next(data),
//       error: err => console.error(err)
//     });
//   }

//   createScreen(screen: Partial<Screen>) {
//     return this.http.post<Screen>(this.api, screen);
//   }

//   updateScreen(id: number, screen: Partial<Screen>) {
//     return this.http.put<Screen>(`${this.api}/${id}`, screen);
//   }

//   deleteScreen(id: number) {
//     return this.http.delete<void>(`${this.api}/${id}`);
//   }
// }



// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs';

// export interface Screen {
//    id: number;            // ✅ Must exist
//   name: string;
//   location: string;
//   resolution: string;
//   status: 'active' | 'inactive';
// }

// @Injectable({ providedIn: 'root' })
// export class ScreenService {
//   private http = inject(HttpClient);
//   private api = 'http://localhost:5044/api/screens';

//   private screensSubject = new BehaviorSubject<Screen[]>([]);
//   readonly screens$ = this.screensSubject.asObservable();

//   loadScreens() {
//     this.http.get<Screen[]>(this.api).subscribe({
//       next: screens => this.screensSubject.next(screens),
//       error: err => console.error('Failed to load screens', err)
//     });
//   }

//   createScreen(screen: Partial<Screen>) {
//     return this.http.post<Screen>(this.api, screen);
//   }

//   updateScreen(id: number, screen: Partial<Screen>) {
//     return this.http.put<Screen>(`${this.api}/${id}`, screen);
//   }

//   deleteScreen(id: number) {
//     return this.http.delete<void>(`${this.api}/${id}`);
//   }
// }
