import { createReducer, on } from '@ngrx/store';
import { User } from '../../core/interfaces/user';
import { UserActions, userGetAllAction, userGetAllSuccessAction } from './users.action';

export interface UserStates {
  usersList: User[];
  loading: boolean;
}

export const initialState: UserStates = {
  usersList: [],
  loading: true
};

/*export function usersReducer(
  state: UserStates,
  action: { type: string }
): any {
  switch (action.type) {
    case UserActions.GetAll:
      return {
        usersList: [
          {
            id: 1,
            name: 'ana',
            email: 'ana@gmail.com',
            username: 'test',
          },
        ],
        loading: false,
      };
  }
  return initialState
}*/

export const usersReducer = createReducer(
  initialState,
  on(userGetAllSuccessAction, (state: UserStates,  action: { users: User[] }): UserStates => {
    return {
      ...state,
      usersList: action.users,
      loading: false
    }; 
  }),
 /* on(...autreAction, () => {

  })*/
)
