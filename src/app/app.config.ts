import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { usersReducer } from './store/users/users.reducer';
import {provideStoreDevtools }from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './store/users/users.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      users: usersReducer
    }),
    provideStoreDevtools(),
    provideEffects([ UserEffects ])
  ]
};
