import { createAction } from "@ngrx/store";

export enum UserActions {
    GetAll = '[User] Get All'
}

/*export const userGetAll = function() {
    return {
        type: UserActions.GetAll
    }
}*/

export const userGetAll = createAction(UserActions.GetAll)