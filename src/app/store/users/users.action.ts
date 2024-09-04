import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { User } from '../../core/interfaces/user';

export enum UserActions {
  GetAll = '[Users] Get All',
  GetAllSuccess = '[Users] Get All Success',
  Create = '[Users] Create',
  CreateSuccess = '[Users] Create Success',
}

// export function userGetAllAction() {
//     return {
//         type: UserActions.GetAll
//     }
// }

/*
export const userGetAllAction = createAction(UserActions.GetAll, props<{
  sort?: string
}>());
export const userGetAllSuccessAction = createAction(UserActions.GetAllSuccess, props<{
    users: User[]
}>());

export const userCreateAction = createAction(UserActions.Create, props<{
  name: string,
  email: string
}>());
export const userCreateActionSuccess = createAction(UserActions.CreateSuccess, props<{
    user: User
}>());
*/

export const userActions = createActionGroup({
  source: 'users',
  events: {
    'Get All': props<{
      sort?: string;
    }>(),
    'Get All Success': props<{
      users: User[];
    }>(),
    'Create': props<{
      name: string;
      email: string;
    }>(),
    'Create Success': props<{
      user: User;
    }>(),
    'Delete': props<{
      id: number
    }>(),
    'DeleteSuccess': props<{
      id: number
    }>()
  },
});
