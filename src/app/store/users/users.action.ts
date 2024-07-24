import { createAction, props } from "@ngrx/store";
import { User } from "../../core/interfaces/user.interface";

export enum UsersAction {
    GetAll = '[Users] Get All',
    GetAllSuccess = '[Users] Get All Success'
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