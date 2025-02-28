import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Sign in with your Google account
          </p>
        </div>
        <div>
          <button
            (click)="signInWithGoogle()"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.57 0 6.79 1.24 9.3 3.28l6.93-6.93C34.96 3.33 29.9 1 24 1 14.88 1 6.9 6.11 2.82 13.32l7.97 6.19C12.23 12.01 17.49 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.17 24.5c0-1.63-.14-3.19-.41-4.67H24v8.84h12.66a10.8 10.8 0 01-4.68 7.07l7.54 5.86a22.05 22.05 0 004.72-14.1z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.79 28.06a13.2 13.2 0 010-8.12l-7.97-6.19a22.06 22.06 0 000 20.44l7.97-6.13z"
                />
                <path
                  fill="#34A853"
                  d="M24 47a22.04 22.04 0 0014.92-4.27l-7.54-5.86A13.9 13.9 0 0124 42a13.9 13.9 0 01-7.38-2.13l-7.54 5.86A22.04 22.04 0 0024 47z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
            </span>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent {
  constructor(
    private authService: FirebaseAuthService,
    private router: Router
  ) {}

  signInWithGoogle(): void {
    this.authService
      .signInWithGoogle()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
      });
  }
}
