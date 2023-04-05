import { createReducer, on } from "@ngrx/store"
import { User } from "src/app/core/interfaces/user"
import { userCreateSuccess, userGetAll, userGetAllSuccess, UsersActions } from "./users.action"

export interface UserState {
    usersList: User[]
    loading: boolean
}

const initialState: UserState = {
    usersList: [],
    loading: true
}

/*export const userReducer = function(state: UserState, action: { type: string }): any {
    switch (action.type) {
        case UsersActions.GetAll:
            return {
                users: [
                    {
                        id: 1,
                        name: 'ana',
                        email: 'ana@gmail.com'
                    }
                ],
                loading: false
            }
    }
}*/

export const userReducer = createReducer(
    initialState,
    on(userGetAllSuccess, (state: UserState, action: { users: User[] }): UserState => {
        return {
            ...state,
            usersList: action.users,
            loading: false
        }
    }),
    on(userCreateSuccess, (state: UserState, action: { user: User }): UserState  => {
        return {
            ...state,
            usersList: [...state.usersList, action.user]
        }
    })
)