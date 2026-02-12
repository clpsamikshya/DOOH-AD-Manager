import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';

import { ProofOfPlayService, ProofOfPlay } from '../../services/ProofOfPlay';
import { ScreenService, Screen } from '../../services/screen';


@Component({
  selector: 'app-proof-of-play',
  standalone: true,
  imports: [CommonModule, NgForOf],

  template: `
    <h2>Proof of Play</h2>

    <div *ngFor="let p of proofs">
      <p>
        Screen: {{ screenIdNameMap[p.screenId] || 'Unknown' }} |
        Ad ID: {{ p.adId }} |
        Played At: {{ p.playedAt }}
      </p>
    </div>
  `
})
export class ProofOfPlayComponent implements OnInit {

  private proofService = inject(ProofOfPlayService);
  private screenService = inject(ScreenService);

  proofs: ProofOfPlay[] = [];

  // Maps: screenId (GUID) -> screen name
  screenIdNameMap: Record<string, string> = {};


  ngOnInit(): void {

    /* Load screens */
    this.screenService.loadScreens();

    this.screenService.screens$.subscribe(
      (screens: Screen[]) => {

        this.screenIdNameMap = {};

        screens.forEach(s => {
          this.screenIdNameMap[s.id] = s.name;
        });
      }
    );


    /* Load proofs */
    this.proofService.getProofs().subscribe({
      next: data => this.proofs = data,
      error: err => console.error('Failed to load proofs:', err)
    });

  }

}


// import { Component, inject } from '@angular/core';
// import { CommonModule, NgForOf, AsyncPipe } from '@angular/common';
// import { ProofOfPlayService, ProofOfPlay } from '../../services/ProofOfPlay';
// import { ScreenService } from '../../services/screen';

// interface AppScreen {
//   id: number;   // matches ScreenService
//   name: string;
// }

// @Component({
//   selector: 'app-proof-of-play',
//   standalone: true,
//   imports: [CommonModule, NgForOf],
//   template: `
//     <h2>Proof of Play</h2>

//     <div *ngFor="let p of proofs">
//       <p>
//         Screen: {{ screenIdNameMap[p.screenId] || 'Unknown' }} |
//         Ad ID: {{ p.adId }} |
//         Played At: {{ p.playedAt }}
//       </p>
//     </div>
//   `
// })
// export class ProofOfPlayComponent {
//   private proofService = inject(ProofOfPlayService);
//   private screenService = inject(ScreenService);

//   proofs: ProofOfPlay[] = [];
//   screenIdNameMap: Record<string, string> = {};

//   constructor() {
//     // Load screens first to build mapping
//     this.screenService.screens$.subscribe((screens: AppScreen[]) => {
//       this.screenIdNameMap = {};
//       screens.forEach(s => {
//         this.screenIdNameMap[s.id.toString()] = s.name; // screenId from backend is string
//       });
//     });
//     this.screenService.loadScreens();

//     // Load proofs
//     this.proofService.getProofs().subscribe({
//       next: (data: ProofOfPlay[]) => this.proofs = data,
//       error: (err: any) => console.error('Failed to load proofs:', err)
//     });
//   }
// }
