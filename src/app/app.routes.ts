import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    {
        path: '',
        component: UsersComponent
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.routes')
            .then(_exports => _exports.routes),
        data: {
            preload: false
        }
    }
];
