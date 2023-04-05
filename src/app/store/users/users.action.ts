import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/interfaces/user";

export enum UsersActions {
    GetAll = '[User] Get All',
    GetAllSuccess = '[User] Get All Success'
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