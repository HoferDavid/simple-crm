import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: process.env['FIREBASE_API_KEY'],
        authDomain: process.env['FIREBASE_AUTH_DOMAIN'],
        projectId: process.env['FIREBASE_PROJECT_ID'],
        storageBucket: process.env['FIREBASE_STORAGE_BUCKET'],
        messagingSenderId: process.env['FIREBASE_MESSAGING_SENDER_ID'],
        appId: process.env['FIREBASE_APP_ID'],
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
