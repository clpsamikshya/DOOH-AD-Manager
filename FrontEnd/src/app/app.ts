import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <header class="header">
      <h1>DOOH Ad Manager</h1>

      <nav class="nav">
        <a routerLink="/screens" routerLinkActive="active">Screens</a>
        <a routerLink="/ads" routerLinkActive="active">Ads</a>
        <a routerLink="/playlists" routerLinkActive="active">Playlists</a>
        <a routerLink="/campaigns" routerLinkActive="active">Campaigns</a>
        <a routerLink="/proof-of-play" routerLinkActive="active">Proof of Play</a>
      </nav>
    </header>

    <main class="main">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .header {
      background: #032346;
      color: white;
      padding: 15px;
    }

    .nav {
      margin-top: 10px;
      display: flex;
      gap: 15px;
    }

    .nav a {
      color: white;
      text-decoration: none;
      padding: 5px 10px;
      border-radius: 4px;
    }

    .nav a:hover {
      background: rgba(255,255,255,0.2);
    }

    .active {
      background: #0d6efd;
    }

    .main {
      padding: 15px;
    }
  `]
})
export class AppComponent {}

