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


