import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, catchError, map, switchMap, tap } from "rxjs";
import { NotificationService } from "../../core/services/notification.service";
import { UserService } from "../../core/services/user.service";
import { userCreateAction, userCreateActionSuccess, usersActionGetAll, usersActionGetAllSuccess } from "./users.action";

@Injectable({
    providedIn: 'root'
})
export class UsersEffect {
    private actions$ = inject(Actions)
    private userService = inject(UserService)
    private notification = inject(NotificationService)

    usersGetAll$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(usersActionGetAll),
            switchMap((action) => this.userService.getAll(action.sort)),
            map(users => usersActionGetAllSuccess({ users }))
        )
    })

    userCreate$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(userCreateAction),
            switchMap((action) => this.userService.create(action.payload)),
            map(user => userCreateActionSuccess({ user })),
            tap(() => this.notification.success('Utilisateur créé')),
            catchError((err) => {
                this.notification.error('Erreur')
                throw err
            })
        )
    })
}