import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../../core/interfaces/user';
import { UserCreateAction, UsersGetAllAction } from './users.action';
import { UserService } from '../../core/services/user.service';
import { Observable, tap } from 'rxjs';

export interface UserStateModel {
  usersList: User[];
  loading: boolean;
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
    usersList: [],
    loading: true,
  },
})
@Injectable({
  providedIn: 'root',
})
export class UserState {
  private userService = inject(UserService);

  @Selector()
  static getUsersList(state: UserStateModel): User[] {
    return state.usersList;
  }

  @Action(UsersGetAllAction)
  getAll(
    context: StateContext<UserStateModel>,
    action: UsersGetAllAction
  ): Observable<any> {
    return this.userService.getAll(action.sort).pipe(
      tap((users) => {
        // const currentState = context.getState()
        context.patchState({
          usersList: users,
          loading: false,
        });
      })
    );
  }

  @Action(UserCreateAction)
  create(
    context: StateContext<UserStateModel>,
    action: UserCreateAction
  ): Observable<any> {
    return this.userService.create(action.form).pipe(
      tap((user) => {
        const currentState = context.getState();
        context.patchState({
          usersList: [...currentState.usersList, user],
        });
      })
    );
  }
}
