import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { User } from "../core/user.interface";
import { GetUsersAction } from "./users.action";
import { Observable, tap } from "rxjs";
import { UserService } from "../core/services/user.service";

export interface UserStateModel {
    usersList: User[],
    loading: boolean,
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        usersList: [],
        loading: true
    }
})
@Injectable()
export class UserState {

    constructor(private userService: UserService) {}

    @Selector()
    static getUsersList(state: UserStateModel): User[] {
        return state.usersList
    }

    @Action(GetUsersAction)
    getUsers(context: StateContext<UserStateModel>, action: GetUsersAction): Observable<any> {
        return this.userService.getAll(action.sort)
            .pipe(
                tap((users: User[]) => {
                    //const state = context.getState()
                    context.patchState({
                        usersList: users,
                        loading: true
                    })
                })
            )
    }
}