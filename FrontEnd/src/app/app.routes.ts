import { Routes } from '@angular/router';
import { ScreenListComponent } from './components/screen-list/screen-list';
import { AdListComponent } from './pages/ad-list/ad-list';
import { PlaylistListComponent } from './app/pages/playlist-list';
import { CampaignListComponent } from './app/pages/campaign-list';
import { ProofOfPlayComponent } from './pages/ad-list/Proof-of-Play';


export const routes: Routes = [
  { path: 'screens', component: ScreenListComponent },
  { path: 'ads', component: AdListComponent },
  { path: 'playlists', component: PlaylistListComponent },
  { path: 'campaigns', component: CampaignListComponent }, 
   { path: 'proof-of-play', component: ProofOfPlayComponent },     
  { path: '', redirectTo: 'screens', pathMatch: 'full' }
];




// import { ScreenListComponent } from './components/screen-list/screen-list';
// import { AdListComponent } from './pages/ad-list/ad-list';
// import { PlaylistListComponent } from './app/pages/playlist-list';
// import { CampaignListComponent } from './app/pages/campaign-list';
// import { CampaignAdListComponent } from './app/pages/campaign-ad-list';


// export const routes: Routes = [
//   { path: 'screens', component: ScreenListComponent },
//   { path: 'ads', component: AdListComponent },
//   { path: 'playlists', component: PlaylistListComponent },
//   { path: 'campaigns', component: CampaignListComponent },
//   { path: 'campaign-ads', component: CampaignAdListComponent },
//   { path: '', redirectTo: 'screens', pathMatch: 'full' }
// ];



// import { Routes } from '@angular/router';

// import { AdListComponent } from './pages/ad-list/ad-list';
// //import { CreateAdComponent } from './pages/create-ad/create-ad';
// import { SettingsComponent } from './pages/settings/settings';

// export const routes: Routes = [

//   { path: 'ads', component: AdListComponent },

//   { path: '', redirectTo: 'ads', pathMatch: 'full' },

//  // { path: 'create-ad', component: CreateAdComponent },

//    { path: 'ad-list', component: AdListComponent },
//   { path: 'settings', component: SettingsComponent }

// ];
