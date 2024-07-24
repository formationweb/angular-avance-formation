import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { UsersState } from './store/users/users.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(), 
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),
    importProvidersFrom(
      NgxsReduxDevtoolsPluginModule.forRoot(),
      NgxsModule.forRoot([ UsersState ])
    )
  ]
};
