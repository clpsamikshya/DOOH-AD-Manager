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



// import { Component, inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ScreenService, Screen } from '../../services/screen';

// @Component({
//   selector: 'app-screen-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './screen-list.html'
// })
// export class ScreenListComponent implements OnInit {

//   private screenService = inject(ScreenService);

//   screens: Screen[] = [];

//   // Always initialized (never null)
//   editing: Screen = this.emptyScreen();

//   isEditing = false;

//   ngOnInit() {
//     this.loadScreens();
//   }

//   // Create empty object
//   private emptyScreen(): Screen {
//     return {
//       id: '',
//       name: '',
//       location: '',
//       resolution: '',
//       status: 'active'
//     };
//   }

//   loadScreens() {
//     this.screenService.screens$.subscribe(data => {
//       this.screens = data;
//     });

//     this.screenService.loadScreens();
//   }

//   // ADD
//   createScreen() {
//     this.editing = this.emptyScreen();
//     this.isEditing = true;
//   }

//   // EDIT
//   editScreen(screen: Screen) {
//     this.editing = { ...screen };
//     this.isEditing = true;
//   }

//   // SAVE
//   saveScreen() {

//     if (!this.editing.id) {
//       // CREATE
//       this.screenService.createScreen(this.editing).subscribe(() => {
//         this.loadScreens();
//         this.cancel();
//       });
//     } else {
//       // UPDATE
//       this.screenService
//         .updateScreen(this.editing.id, this.editing)
//         .subscribe(() => {
//           this.loadScreens();
//           this.cancel();
//         });
//     }
//   }

//   // DELETE
//   deleteScreen(id: string) {
//     this.screenService.deleteScreen(id).subscribe(() => {
//       this.loadScreens();
//     });
//   }

//   // CANCEL
//   cancel() {
//     this.editing = this.emptyScreen();
//     this.isEditing = false;
//   }
// }




// import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Screen, ScreenService } from '../../services/screen';
// import { AdListComponent } from '../../pages/ad-list/ad-list';


// @Component({
//   selector: 'app-screen-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule, NgForOf, NgIf, AsyncPipe, AdListComponent],
//   template: `
//     <div class="dashboard-container">
//       <!-- Screens Sidebar -->
//       <div class="screens-sidebar">
//         <h3>Select Screen</h3>
//         <select [(ngModel)]="selectedScreenId" (change)="onScreenChange()">
//           <option *ngFor="let screen of screens$ | async" [value]="screen.id">
//             {{ screen.name }}
//           </option>
//         </select>

//         <!-- Selected screen details -->
//         <div *ngIf="selectedScreen" class="screen-details">
//           <p><strong>Location:</strong> {{ selectedScreen.location }}</p>
//           <p><strong>Resolution:</strong> {{ selectedScreen.resolution }}</p>
//           <p><strong>Status:</strong> 
//             <span [class.active]="selectedScreen.status==='active'" 
//                   [class.inactive]="selectedScreen.status==='inactive'">
//               {{ selectedScreen.status | titlecase }}
//             </span>
//           </p>
//           <button class="edit-btn" (click)="edit(selectedScreen)">Edit</button>
//           <button class="delete-btn" (click)="delete(selectedScreen.id)">Delete</button>
//         </div>

//         <!-- Inline Edit / Create Form -->
//         <div *ngIf="showForm" class="screen-form">
//           <input placeholder="Name" [(ngModel)]="form.name">
//           <input placeholder="Location" [(ngModel)]="form.location">
//           <input placeholder="Resolution" [(ngModel)]="form.resolution">
//           <select [(ngModel)]="form.status">
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//           <div class="form-buttons">
//             <button class="save-btn" (click)="save()">Save</button>
//             <button class="cancel-btn" (click)="resetForm()">Cancel</button>
//           </div>
//         </div>
//       </div>

//       <!-- Ads list next to sidebar -->
//       <div class="ads-list">
//         <app-ad-list [screenId]="selectedScreenId"></app-ad-list>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .dashboard-container {
//       display: flex;
//       gap: 20px;
//       padding: 20px;
//       font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//     }

//     /* Sidebar */
//     .screens-sidebar {
//       flex: 0 0 250px;
//       background: #f4f4f4;
//       padding: 15px;
//       border-radius: 6px;
//     }

//     .screens-sidebar h3 {
//       margin-top: 0;
//     }

//     select, input {
//       width: 100%;
//       padding: 6px;
//       margin: 6px 0;
//       border-radius: 4px;
//       border: 1px solid #ccc;
//     }

//     .screen-details {
//       margin-top: 10px;
//       background: #e6f7ff;
//       padding: 10px;
//       border-radius: 6px;
//     }

//     .screen-details p {
//       margin: 4px 0;
//     }

//     .status.active { color: green; font-weight: bold; }
//     .status.inactive { color: red; font-weight: bold; }

//     .screen-form {
//       margin-top: 10px;
//       display: flex;
//       flex-direction: column;
//       gap: 6px;
//       background: #fff9e6;
//       padding: 10px;
//       border-radius: 6px;
//     }

//     .form-buttons {
//       display: flex;
//       gap: 6px;
//       margin-top: 6px;
//     }

//     .save-btn {
//       background-color: #28a745;
//       color: white;
//       border: none;
//       border-radius: 4px;
//       padding: 6px 12px;
//       cursor: pointer;
//     }
//     .save-btn:hover { background-color: #218838; }

//     .cancel-btn {
//       background-color: #6c757d;
//       color: white;
//       border: none;
//       border-radius: 4px;
//       padding: 6px 12px;
//       cursor: pointer;
//     }
//     .cancel-btn:hover { background-color: #5a6268; }

//     /* Ads list takes remaining space */
//     .ads-list {
//       flex: 1;
//     }

//     .edit-btn, .delete-btn {
//       margin-top: 6px;
//       padding: 4px 8px;
//       border: none;
//       border-radius: 4px;
//       cursor: pointer;
//     }

//     .edit-btn { background-color: #ffc107; }
//     .edit-btn:hover { background-color: #e0a800; }

//     .delete-btn { background-color: #dc3545; color: white; }
//     .delete-btn:hover { background-color: #c82333; }
//   `]
// })
// export class ScreenListComponent {
//   private screenService = inject(ScreenService);

//   screens$ = this.screenService.screens$;
//   selectedScreenId: number | null = null;
//   selectedScreen: Screen | null = null;

//   showForm = false;
//   editingId: number | null = null;
//   form: Partial<Screen> = {};

//   constructor() {
//     this.screenService.loadScreens();

//     // Auto-select first screen if available
//     this.screens$.subscribe(screens => {
//       if (screens.length && !this.selectedScreenId) {
//         this.selectedScreenId = screens[0].id;
//         this.onScreenChange();
//       }
//     });
//   }

//   onScreenChange() {
//     this.screens$.subscribe(screens => {
//       this.selectedScreen = screens.find(s => s.id === +this.selectedScreenId!) || null;
//     });
//     this.resetForm();
//   }

//   edit(screen: Screen) {
//     this.showForm = true;
//     this.editingId = screen.id;
//     this.form = { ...screen };
//   }

//   save() {
//     if (!this.form) return;

//     if (this.editingId) {
//       this.screenService.updateScreen(this.editingId, this.form).subscribe({
//         next: () => { this.screenService.loadScreens(); this.resetForm(); },
//         error: err => console.error(err)
//       });
//     } else {
//       this.screenService.createScreen(this.form).subscribe({
//         next: () => { this.screenService.loadScreens(); this.resetForm(); },
//         error: err => console.error(err)
//       });
//     }
//   }

//   delete(id: number) {
//     this.screenService.deleteScreen(id).subscribe({
//       next: () => {
//         this.screenService.loadScreens();
//         if (this.selectedScreenId === id) this.selectedScreen = null;
//       },
//       error: err => console.error(err)
//     });
//   }

//   resetForm() {
//     this.showForm = false;
//     this.form = {};
//     this.editingId = null;
//   }
// }



// import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Screen, ScreenService } from '../../services/screen';

// @Component({
//   selector: 'app-screen-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule, NgForOf, NgIf, AsyncPipe],
//   templateUrl: './screen-list.html',
//   styleUrls: ['./screen-list.css']
// })
// export class ScreenListComponent {
//   private screenService = inject(ScreenService);

//   screens$ = this.screenService.screens$;

//   showForm = false;
//   editingId: number | null = null;
//   form: Partial<Screen> = {};

//   constructor() {
//     this.screenService.loadScreens();
//   }

//   save() {
//     if (this.editingId) {
//       this.screenService.updateScreen(this.editingId, this.form).subscribe({
//         next: () => {
//           this.screenService.loadScreens();
//           this.resetForm();
//         },
//         error: err => console.error(err)
//       });
//     } else {
//       this.screenService.createScreen(this.form).subscribe({
//         next: () => {
//           this.screenService.loadScreens();
//           this.resetForm();
//         },
//         error: err => console.error(err)
//       });
//     }
//   }

//   edit(screen: Screen) {
//     this.showForm = true;
//     this.editingId = screen.id;
//     this.form = { ...screen };
//   }

//   delete(id: number) {
//     this.screenService.deleteScreen(id).subscribe({
//       next: () => this.screenService.loadScreens(),
//       error: err => console.error(err)
//     });
//   }

//   resetForm() {
//     this.showForm = false;
//     this.form = {};
//     this.editingId = null;
//   }
// }
