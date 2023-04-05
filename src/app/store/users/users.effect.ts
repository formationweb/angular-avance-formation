import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, map, Observable, switchMap, tap } from "rxjs";
import { User } from "src/app/core/interfaces/user";
import { NotificationService } from "src/app/core/services/notification.service";
import { UserService } from "src/app/core/services/user.service";
import { userCreate, userCreateSuccess, userGetAll, userGetAllSuccess } from "./users.action";

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

    createUser$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(userCreate),
            switchMap((action) => {
                return this.userService.create(action.body)
            }),
            map((user: User) => userCreateSuccess({ user })),
            tap(() => {
                this.notification.success('Utilisateur créé')
            }),
            catchError((err) => {
                this.notification.error('Erreur')
                throw err
            })
        )
    })

    constructor(
        private userService: UserService,
        private actions$: Actions,
        private notification: NotificationService
    ) {}
}