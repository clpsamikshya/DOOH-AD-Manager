import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProofOfPlay {
  id: string;
  screenId: string;
  adId: string;
  playedAt: string;
}

@Injectable({ providedIn: 'root' })
export class ProofOfPlayService {
  private http = inject(HttpClient);
  private api = 'http://localhost:5044/api/proof';

  /** Get all proofs */
  getProofs(): Observable<ProofOfPlay[]> {
    return this.http.get<ProofOfPlay[]>(this.api);
  }

  /** Add a new proof */
  addProof(proof: Partial<ProofOfPlay>): Observable<ProofOfPlay> {
    return this.http.post<ProofOfPlay>(this.api, proof);
  }
}
