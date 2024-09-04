import { createAction, props } from '@ngrx/store';
import { User } from '../../core/interfaces/user';

export enum UserActions {
  GetAll = '[Users] Get All',
  GetAllSuccess = '[Users] Get All Success',
}

// export function userGetAllAction() {
//     return {
//         type: UserActions.GetAll
//     }
// }

export const userGetAllAction = createAction(UserActions.GetAll, props<{
  sort?: string
}>());
export const userGetAllSuccessAction = createAction(UserActions.GetAllSuccess, props<{
    users: User[]
}>());
