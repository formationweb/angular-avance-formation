import { authGuard } from '../../core/guards/auth.guard';
import { UsersComponent } from './users.component';

export const routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [authGuard],
  }
];