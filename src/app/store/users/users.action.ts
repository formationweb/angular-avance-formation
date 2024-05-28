import { createAction, props } from '@ngrx/store';
import { User } from '../../core/interfaces/user.interface';
import { UserCreatePayload } from '../../core/services/user.service';

export enum UsersAction {
  GetAll = '[Users] Get All',
  GetAllSuccess = '[User] Get All Success',
  Create = '[User] Create',
  CreateSuccess = '[User] Create Success',
  Delete = '[User] Delete',
  DeleteSuccess = '[User] Delete Success',
}

// export const userGetAllAction = function () {
//   return {
//     type: UsersAction.GetAll,
//   };
// };

export const userGetAllAction = createAction(
  UsersAction.GetAll,
  props<{
    sort?: string;
  }>()
);
export const userGetAllSuccessAction = createAction(
  UsersAction.GetAllSuccess,
  props<{
    users: User[];
  }>()
);
export const userCreateAction = createAction(
  UsersAction.Create,
  props<{
    form: UserCreatePayload;
  }>()
);
export const userCreateSuccessAction = createAction(
  UsersAction.CreateSuccess,
  props<{
    user: User;
  }>()
);
export const userDeleteAction = createAction(
  UsersAction.Delete,
  props<{
    id: number;
  }>()
);
export const userDeleteSuccessAction = createAction(
  UsersAction.DeleteSuccess,
  props<{
    id: number;
  }>()
);
