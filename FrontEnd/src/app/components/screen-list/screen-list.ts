import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Screen, ScreenService } from '../../services/screen';

@Component({
  selector: 'app-screen-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './screen-list.html'
})
export class ScreenListComponent {
  private screenService = inject(ScreenService);

  screens: Screen[] = [];
  editing: Partial<Screen> | null = null; // Partial for new item
  isEditing = false;

  constructor() {
    this.screenService.screens$.subscribe(s => this.screens = s);
    this.screenService.loadScreens();
  }

  addScreen() {
    this.editing = { name: '', location: '', resolution: '', status: 'active' };
    this.isEditing = true;
  }

  editScreen(screen: Screen) {
    this.editing = { ...screen };
    this.isEditing = true;
  }

  saveScreen() {
    if (!this.editing) return;

    if (!('id' in this.editing)) {
      // New screen
      this.screenService.createScreen(this.editing as Omit<Screen, 'id'>).subscribe(() => {
        this.screenService.loadScreens();
        this.cancel();
      });
    } else {
      // Update existing screen
      this.screenService.updateScreen(this.editing.id!, this.editing).subscribe(() => {
        this.screenService.loadScreens();
        this.cancel();
      });
    }
  }

  deleteScreen(id: string) {
    this.screenService.deleteScreen(id).subscribe(() => this.screenService.loadScreens());
  }

  cancel() {
    this.editing = null;
    this.isEditing = false;
  }
}



