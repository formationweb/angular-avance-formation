import { Routes } from "@angular/router";
import { authGuard } from "../../core/guards/auth.guard";
import { UsersComponent } from "./users.component";

export const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        canActivate: [authGuard]
    },
]
