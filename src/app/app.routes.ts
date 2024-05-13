import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
