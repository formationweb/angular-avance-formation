import { createReducer } from '@ngrx/store';
import { User } from '../../core/interfaces/user.interface';

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
  /*on(
    userGetAllAction,
    (currentState: UsersState, action: { type: string }): UsersState => {
      return {
        usersList: [
          {
            id: 1,
            name: 'ana',
            email: 'ana@gmail.com',
          },
        ],
        loading: false,
      };
    }
  ),*/
  /*on(createUser,  (currentState: UsersState, action: { type: string }): UsersState => {
    })*/
);
