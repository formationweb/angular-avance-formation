import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, catchError, map, switchMap, tap } from "rxjs";
import { UserService } from "src/app/core/services/user.service";
import { userCreateAction, userCreateSuccessAction, userDeleteAction, userDeleteSuccessAction, userGetAll, userGetAllSuccess } from "./users.action";
import { NotificationService } from "src/app/core/services/notification.service";

@Injectable({
    providedIn: 'root'
})
export class UserEffect {
    loadUsers$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(userGetAll),
            switchMap((action) => {
                return this.userService.getAll(action.sort)
            }),
            map(users => userGetAllSuccess({ users }))
        )
    })

    createUser$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(userCreateAction),
            switchMap(action => this.userService.create(action.form)),
            map(user => userCreateSuccessAction({ user })),
            tap(() => {
                this.notification.success('Utilisateur créé')
            }),
            catchError((err) => {
                this.notification.error('Erreur')
                throw err
            })
        )
    })

    deleteUser$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(userDeleteAction),
            switchMap(action => {
                return this.userService.delete(action.userId)
                    .pipe(
                        map(() => userDeleteSuccessAction({ userId: action.userId }))
                    )
            }),
            tap(() => {
                this.notification.success('Utilisateur supprimé')
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