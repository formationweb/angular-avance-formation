import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    {
        path: '',
        component: UsersComponent
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component')
            .then(_exports => _exports.LoginComponent),
        data: {
            preload: false
        }
    }
];
