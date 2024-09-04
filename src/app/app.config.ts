import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { usersFeature, usersReducer } from './store/users/users.reducer';
import {provideStoreDevtools }from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects';
import { userCreate$, userDelete$, userGetAll$ } from './store/users/users.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(usersFeature),
    provideStoreDevtools(),
    provideEffects({
      userGetAll$,
      userCreate$,
      userDelete$
    })
  ]
};
