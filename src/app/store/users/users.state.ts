import { Injectable, inject } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { User } from "../../core/interfaces/user.interface";
import { UserService } from "../../core/services/user.service";
import { CreateUserAction, GetUsersAction } from "./users.action";

export interface IUsersState {
    usersList: User[],
    loading: boolean
}

@State<IUsersState>({
    name: 'users',
    defaults: {
        usersList: [],
        loading: true
    }
})
@Injectable({
    providedIn: 'root'
})
export class UsersState {
    private userService = inject(UserService)

    @Selector()
    static getUsersList(state: IUsersState): User[] {
        return state.usersList
    }

    @Action(GetUsersAction)
    getUsers(context: StateContext<IUsersState>, action: GetUsersAction): Observable<any> {
        return this.userService.getAll(action.sort).pipe(
            tap((users) => {
                context.patchState({
                    usersList: users,
                    loading: true
                })
            })
        )
    }

    @Action(CreateUserAction)
    createUser(context: StateContext<IUsersState>, action: CreateUserAction): Observable<any> {
        return this.userService.create(action.payload).pipe(
            tap((user) => {
                const { usersList } = context.getState()
                context.patchState({
                    usersList: [...usersList, user],
                    loading: true
                })
            })
        )
    }
}