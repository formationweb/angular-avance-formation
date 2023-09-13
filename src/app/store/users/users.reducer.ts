import { User } from "src/app/core/user.interface"
import { UserActions, userGetAll } from "./users.action"
import { createReducer, on } from "@ngrx/store"

export interface UserState {
    usersList: User[],
    loading: boolean
}

const initialState: UserState = {
    usersList: [],
    loading: true
}

/*export const userReducer = function(state: UserState, action: { type: string }): any {
    switch (action.type) {
        case UserActions.GetAll:
            return {
                usersList: [
                    {
                        id: 1,
                        name: 'ana',
                        username: 'ana',
                        email: 'ana@gmail.com'
                    }
                ],
                loading: true
            }
    }
}*/

export const userReducer = createReducer(
        initialState,
        on(userGetAll, (state: UserState, action: { type: string }): UserState => {
            return {
                usersList: [
                    {
                        id: 1,
                        name: 'ana',
                        username: 'ana',
                        email: 'ana@gmail.com'
                    }
                ],
                loading: true
            }
        })
)