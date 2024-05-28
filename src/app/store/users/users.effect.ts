import { Injectable, inject } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { UserService } from "../../core/services/user.service";
import { userGetAllAction } from "./users.action";

@Injectable({
    providedIn: 'root'
})
export class UsersEffect {
    private userService = inject(UserService)
    private actions$ = inject(Actions)

    userGetAll$: Observable<Action> = this.actions$.pipe(
        ofType(userGetAllAction),
        
    )
}