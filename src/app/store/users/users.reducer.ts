import { createReducer, on } from '@ngrx/store';
import { User } from '../../core/interfaces/user.interface';
import {
  userCreateSuccessAction,
  userGetAllSuccessAction,
} from './users.action';

export interface UsersState {
  usersList: User[];
  loading: boolean;
}

const initialState: UsersState = {
  usersList: [],
  loading: true,
};

/*
export function usersReducer(currentState: UsersState, action: { type: string }): any {
    switch (action.type) {
        case UsersAction.GetAll:
            return {
                usersList: [
                    {
                        id: 1,
                        name: 'ana',
                        email: 'ana@gmail.com'
                    }
                ],
                loading: false
            }
    }
}
*/

export const usersReducer = createReducer(
  initialState,
  on(
    userGetAllSuccessAction,
    (currentState: UsersState, action: { users: User[] }): UsersState => {
      return {
        ...currentState,
        usersList: action.users,
      };
    }
  ),
  on(
    userCreateSuccessAction,
    (currentState: UsersState, action: { user: User }): UsersState => {
      return {
        ...currentState,
        usersList: [...currentState.usersList, action.user]
      }
    }
  )
);
