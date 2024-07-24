import { createReducer, on } from "@ngrx/store"
import { User } from "../../core/interfaces/user.interface"
import { usersActionGetAllSuccess } from "./users.action"

export interface UsersState {
    usersList: User[]
    loading: boolean
}

const usersInitialState: UsersState = {
    usersList: [],
    loading: true
}

/*
export function usersReducer(currentState: UsersState, action: { type: string }): any {
    switch (action.type) {
        case UsersAction.GetAll:
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
    return usersInitialState
}*/

export const usersReducer = createReducer(
    usersInitialState, 
    on(usersActionGetAllSuccess, (currentState: UsersState, action: { users: User[] }): UsersState => {
        return {
            ...currentState,
            usersList: action.users,
            loading: false,
        }
    }),
    // on(/*Nouvelle action */, (currentState: UsersState, action: { type: string }): UsersState => {

    // })
)