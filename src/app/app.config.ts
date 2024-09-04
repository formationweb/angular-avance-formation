import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { MyPreloadStrategyService } from './core/preload/my-preload-strategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(MyPreloadStrategyService)),
    provideHttpClient()
  ]
};
