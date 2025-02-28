// src/app/config/firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { environment } from '../../enviroments/enviroment';

const firebaseConfig = environment.firebase;

const app = initializeApp(firebaseConfig);

if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        getAnalytics(app);
      }
    })
    .catch((error) => {
      console.error('Firebase Analytics no es soportado:', error);
    });
}

export { app };
