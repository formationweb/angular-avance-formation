import { inject, Injectable } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, Observable, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { userActions } from './users.action';

/*
@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  private userService = inject(UserService);
  private actions$ = inject(Actions);

  userGetAll$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.getAll),
      switchMap((action) => this.userService.getAll(action.sort)),
      map((users) => userActions.getAllSuccess({ users }))
    );
  });

  userCreate$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.create),
      switchMap((action) => this.userService.create(action)),
      map((user) => userActions.createSuccess({ user }))
    );
  });

  userDelete$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.delete),
      switchMap((action) => {
        return this.userService
          .delete(action.id)
          .pipe(map(() => userActions.deleteSuccess({ id: action.id })));
      })
    );
  });
}
  */

export const userGetAll$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userService = inject(UserService);
    return actions$.pipe(
      ofType(userActions.getAll),
      switchMap((action) => userService.getAll(action.sort)),
      map((users) => userActions.getAllSuccess({ users }))
    );
  },
  {
    functional: true,
  }
);

export const userCreate$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userService = inject(UserService);
    return actions$.pipe(
      ofType(userActions.create),
      switchMap((action) => userService.create(action)),
      map((user) => userActions.createSuccess({ user }))
    );
  },
  {
    functional: true,
  }
);

export const userDelete$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userService = inject(UserService);
    return actions$.pipe(
      ofType(userActions.delete),
      switchMap((action) => {
        return userService
          .delete(action.id)
          .pipe(map(() => userActions.deleteSuccess({ id: action.id })));
      })
    );
  },
  {
    functional: true,
  }
);
