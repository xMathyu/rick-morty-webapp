import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from 'firebase/auth';
import { app } from '../config/firebase.config';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  private auth = getAuth(app);

  signInWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }
}
