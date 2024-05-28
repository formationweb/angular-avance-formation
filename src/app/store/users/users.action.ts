import { createAction } from "@ngrx/store";

export enum UsersAction {
  GetAll = '[Users] Get All',
}

// export const userGetAllAction = function () {
//   return {
//     type: UsersAction.GetAll,
//   };
// };

export const userGetAllAction = createAction(UsersAction.GetAll)