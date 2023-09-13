import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, map, switchMap } from "rxjs";
import { UserService } from "src/app/core/services/user.service";
import { userGetAll, userGetAllSuccess } from "./users.action";

@Injectable({
    providedIn: 'root'
})
export class UserEffect {
    loadUsers$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(userGetAll),
            switchMap(() => {
                return this.userService.getAll()
            }),
            map(users => userGetAllSuccess({ users }))
        )
    })

    constructor(
        private userService: UserService,
        private actions$: Actions
    ) {}
}