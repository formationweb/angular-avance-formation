import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, Observable, switchMap } from "rxjs";
import { User } from "src/app/core/interfaces/user";
import { UserService } from "src/app/core/services/user.service";
import { userGetAll, userGetAllSuccess } from "./users.action";

@Injectable({
    providedIn: 'root'
})
export class UsersEffect {
    loadUsers$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(userGetAll),
            switchMap((action) => {
                return this.userService.getAll(action.sort)
            }),
            map((users: User[]) => userGetAllSuccess({ users }))
        )
    })

    constructor(
        private userService: UserService,
        private actions$: Actions
    ) {}
}