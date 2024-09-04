import { inject, Injectable } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, Observable, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { userGetAllAction, userGetAllSuccessAction } from './users.action';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  private userService = inject(UserService);
  private actions$ = inject(Actions);

  userGetAll$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(userGetAllAction),
      switchMap((action) => this.userService.getAll(action.sort)),
      map(users => userGetAllSuccessAction({ users }))
    )
  })
}
