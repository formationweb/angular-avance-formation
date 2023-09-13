import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/user.interface";

export enum UserActions {
    GetAll = '[User] Get All',
    GetAllSuccess = '[User] Get All Success'
}

/*export const userGetAll = function() {
    return {
        type: UserActions.GetAll
    }
}*/

export const userGetAll = createAction(UserActions.GetAll, props<{
    sort?: string
}>())
export const userGetAllSuccess = createAction(UserActions.GetAllSuccess, props<{
    users: User[]
}>())

