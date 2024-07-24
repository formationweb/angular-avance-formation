import { createAction, props } from "@ngrx/store";
import { User } from "../../core/interfaces/user.interface";
import { UserPayload } from "../../core/services/user.service";

export enum UsersAction {
    GetAll = '[Users] Get All',
    GetAllSuccess = '[Users] Get All Success',
    CreateAction = '[Users] Create User',
    CreateActionSuccess = '[Users] Create User Success',
    DeleteAction = '[Users] Delete User',
    DeleteActionSuccess = '[Users] Delete User Success'
}

/*
export const usersActionGetAll = function() {
    return {
        type: UsersAction.GetAll
    }
}
*/

export const usersActionGetAll = createAction(UsersAction.GetAll, props<{
    sort?: string
}>())
export const usersActionGetAllSuccess = createAction(UsersAction.GetAllSuccess, props<{
    users: User[]
}>())

export const userCreateAction = createAction(UsersAction.CreateAction, props<{
    payload: UserPayload
}>())
export const userCreateActionSuccess = createAction(UsersAction.CreateActionSuccess, props<{
    user: User
}>())

export const userDeleteAction = createAction(UsersAction.DeleteAction, props<{
    id: number
}>())
export const userDeleteActionSuccess = createAction(UsersAction.DeleteActionSuccess, props<{
    id: number
}>())