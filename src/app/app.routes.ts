import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/users/users.routes').then(m => m.routes)
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
