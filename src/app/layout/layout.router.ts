import { Routes, RouterModule } from '@angular/router'
import { LayoutComponent } from './layout.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
        {
            path: '',
            component: UsersComponent
        }
    ]
}]

export const layoutRouter = RouterModule.forChild(routes)