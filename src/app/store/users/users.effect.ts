import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { userGetAllAction, userGetAllSuccessAction } from './users.action';

@Injectable({
  providedIn: 'root',
})
export class UsersEffect {
  private userService = inject(UserService);
  private actions$ = inject(Actions);

  userGetAll$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
        ofType(userGetAllAction),
        switchMap((action) => {
          return this.userService.getAll(action.sort);
        }),
        map((users) => userGetAllSuccessAction({ users }))
      )
  })
}
