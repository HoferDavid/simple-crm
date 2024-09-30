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
        projectId: 'simple-crm-71ddf',
        appId: '1:596696624017:web:79f7825fda6847b9f4c830',
        storageBucket: 'simple-crm-71ddf.appspot.com',
        apiKey: 'AIzaSyCdV4_DTwm14FLEqLX-bXmkNHnBkGfmsQ8',
        authDomain: 'simple-crm-71ddf.firebaseapp.com',
        messagingSenderId: '596696624017',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
