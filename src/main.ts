import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { BASE_URL } from './app/core/constants/injection';

platformBrowserDynamic([
  {
    provide: BASE_URL,
    useValue: 'https://jsonplaceholder.typicode.com'
  }
]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
