import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, map, switchMap } from "rxjs";
import { UserService } from "../../core/services/user.service";
import { usersActionGetAll, usersActionGetAllSuccess } from "./users.action";

@Injectable({
    providedIn: 'root'
})
export class UsersEffect {
    private actions$ = inject(Actions)
    private userService = inject(UserService)

    usersGetAll$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(usersActionGetAll),
            switchMap((action) => this.userService.getAll(action.sort)),
            map(users => usersActionGetAllSuccess({ users }))
        )
    })
}