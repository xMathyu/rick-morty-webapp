import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseAuthService } from './firebase-auth.service';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../config/firebase.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public currentUser: Observable<User | null> =
    this.currentUserSubject.asObservable();

  private auth = getAuth(app);

  constructor(private firebaseAuthService: FirebaseAuthService) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  signInWithGoogle(): Promise<User> {
    return this.firebaseAuthService
      .signInWithGoogle()
      .then((result) => result.user);
  }

  signOut(): Promise<void> {
    return this.auth.signOut();
  }
}
