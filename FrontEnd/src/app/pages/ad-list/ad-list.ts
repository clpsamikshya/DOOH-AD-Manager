import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ad, AdService } from '../../services/ad';
import { Screen, ScreenService } from '../../services/screen';

@Component({
  selector: 'app-ad-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ad-list.html'
})
export class AdListComponent {
  private adService = inject(AdService);
  private screenService = inject(ScreenService);

  ads: Ad[] = [];
  screens: Screen[] = [];

  editing: Partial<Ad> | null = null;
  isEditing = false;

  constructor() {
    // Load screens first
    this.screenService.screens$.subscribe(s => this.screens = s);
    this.screenService.loadScreens();

    // Load ads
    this.adService.ads$.subscribe(a => this.ads = a);
    this.adService.loadAds();
  }

  addAd() {
    this.editing = {
      title: '',
      mediaUrl: '',
      durationSeconds: 0,
      mediaType: '',
      createdAt: new Date().toISOString(),
      screenId: this.screens.length ? this.screens[0].id : '' // default to first screen
    };
    this.isEditing = true;
  }

  editAd(ad: Ad) {
    this.editing = { ...ad };
    this.isEditing = true;
  }

  saveAd() {
    if (!this.editing) return;

    if (!this.editing.id) {
      this.adService.createAd(this.editing as Omit<Ad, 'id'>).subscribe(() => {
        this.adService.loadAds();
        this.cancel();
      });
    } else {
      this.adService.updateAd(this.editing.id, this.editing).subscribe(() => {
        this.adService.loadAds();
        this.cancel();
      });
    }
  }

  deleteAd(id: string) {
    this.adService.deleteAd(id).subscribe(() => this.adService.loadAds());
  }

  cancel() {
    this.editing = null;
    this.isEditing = false;
  }

  getScreenName(id: string) {
    const screen = this.screens.find(s => s.id === id);
    return screen ? screen.name : 'Unknown';
  }
}




