import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav
      class="bg-gray-800 text-white px-4 py-3 flex items-center justify-between"
    >
      <div class="text-2xl font-bold">Rick & Morty</div>
      <div class="hidden md:flex items-center space-x-4">
        <ng-container *ngIf="user; else desktopLogin">
          <span>{{ user.displayName }}</span>
          <button
            (click)="signOut()"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </ng-container>
        <ng-template #desktopLogin>
          <button
            routerLink="/login"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign In
          </button>
        </ng-template>
      </div>
      <!-- Hamburger button for mobile -->
      <div class="md:hidden">
        <button (click)="toggleMenu()" class="focus:outline-none">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
    <!-- Dropdown menu for mobile -->
    <div *ngIf="menuOpen" class="md:hidden bg-gray-800 text-white px-4 py-2">
      <ng-container *ngIf="user; else mobileLogin">
        <div>{{ user.displayName }}</div>
        <button
          (click)="signOut()"
          class="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-2"
        >
          Sign Out
        </button>
      </ng-container>
      <ng-template #mobileLogin>
        <button
          routerLink="/login"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sign In
        </button>
      </ng-template>
    </div>
  `,
})
export class NavbarComponent implements OnInit {
  user: any = null;
  menuOpen: boolean = false;

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  signOut(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
