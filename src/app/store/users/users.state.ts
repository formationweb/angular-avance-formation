import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { User } from "src/app/core/interfaces/user";
import { UserService } from "src/app/core/services/user.service";
import { GetUsersAction } from "./users.action";

export interface UserStateModel {
    usersList: User[]
    loading: boolean
    toto: string
}

@State({
    name: 'users',
    defaults: {
        usersList: [],
        loading: true,
        toto: 'test'
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
                    /*const currentState = context.getState()
                    context.setState({
                        ...currentState,
                        usersList: users,
                        loading: false
                    })*/
                    context.patchState({
                        usersList: users,
                        loading: false
                    })
                })
            )
    }
}