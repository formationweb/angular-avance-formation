import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { User } from '../../core/interfaces/user.interface';
import { UserService } from '../../core/services/user.service';
import { CreateUsersAction, GetUsersAction } from './users.action';

export interface IUsersState {
  usersList: User[];
  loading: boolean;
}

@State<IUsersState>({
  name: 'users',
  defaults: {
    usersList: [],
    loading: true,
  },
})
@Injectable({
  providedIn: 'root',
})
export class UsersState {
  private userService = inject(UserService);

  @Selector()
  static getUsersList(state: IUsersState): User[] {
    return state.usersList;
  }

  @Action(GetUsersAction)
  getUsers(
    context: StateContext<IUsersState>,
    action: GetUsersAction
  ): Observable<any> {
    return this.userService.getAll(action.sort).pipe(
      tap((users) => {
        // const currentState = context.getState()
        // context.setState({
        //   ...currentState,
        //   usersList: users,
        // })
        context.patchState({
          usersList: users,
        });
      })
    );
  }

  @Action(CreateUsersAction)
  createUser(
    context: StateContext<IUsersState>,
    action: CreateUsersAction
  ): Observable<any> {
    return this.userService.create(action.formValue).pipe(
      tap((user) => {
        const currentState = context.getState();
        context.patchState({
          usersList: [...currentState.usersList, user],
        });
      })
    );
  }
}
