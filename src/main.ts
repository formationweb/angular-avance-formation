import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { BASE_URL } from './app/core/constants/injection';
import { environment } from './environments/environment';


platformBrowserDynamic([
  {
    provide: BASE_URL,
    useValue: environment.baseUrl
  }
]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
