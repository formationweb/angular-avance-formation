import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';
import { NotificationService } from '../../core/services/notification.service';
import { UserService } from '../../core/services/user.service';
import {
    userCreateAction,
    userCreateSuccessAction,
    userGetAllAction,
    userGetAllSuccessAction,
} from './users.action';

@Injectable({
  providedIn: 'root',
})
export class UsersEffect {
  private userService = inject(UserService);
  private actions$ = inject(Actions);
  private notification = inject(NotificationService)

  userGetAll$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(userGetAllAction),
      switchMap((action) => {
        return this.userService.getAll(action.sort);
      }),
      map((users) => userGetAllSuccessAction({ users }))
    );
  });

  createUser$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(userCreateAction),
      switchMap((action) => this.userService.create(action.form)),
      map((user) => userCreateSuccessAction({ user })),
      tap(() => {
        this.notification.success('Utilisateur bien créé !');
      }),
      catchError((err) => {
        this.notification.error('Erreur');
        throw err;
      })
    );
  });
}
