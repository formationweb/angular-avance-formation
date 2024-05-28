import { createAction, props } from '@ngrx/store';
import { User } from '../../core/interfaces/user.interface';

export enum UsersAction {
  GetAll = '[Users] Get All',
  GetAllSuccess = '[User] Get All Success',
}

// export const userGetAllAction = function () {
//   return {
//     type: UsersAction.GetAll,
//   };
// };

export const userGetAllAction = createAction(
  UsersAction.GetAll, 
  props<{
    sort?: string
  }>()
);
export const userGetAllSuccessAction = createAction(
  UsersAction.GetAllSuccess,
  props<{
    users: User[];
  }>()
);
