import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/interfaces/user";

export enum UsersActions {
    GetAll = '[User] Get All',
    GetAllSuccess = '[User] Get All Success',
    Create = '[User] Create',
    CreateSuccess = '[User] Create Success',
    Delete = '[User] Delete',
    DeleteSuccess = '[User] DeleteSuccess'
}

/*export const userGetAll = function() {
    return {
        type: UsersActions.GetAll
    }
}*/

export const userGetAll = createAction(UsersActions.GetAll, props<{
    sort?: string
}>())
export const userGetAllSuccess = createAction(UsersActions.GetAllSuccess, props<{
    users: User[]
}>())

export const userCreate = createAction(UsersActions.Create, props<{
    body: {
        name: string,
        email: string
    }
}>())
export const userCreateSuccess = createAction(UsersActions.CreateSuccess, props<{
    user: User
}>())

export const userDelete = createAction(UsersActions.Delete, props<{
    id: number
}>())
export const userDeleteSuccess = createAction(UsersActions.DeleteSuccess, props<{
    id: number
}>())