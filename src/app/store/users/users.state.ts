import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, Observable, tap } from "rxjs";
import { User } from "src/app/core/interfaces/user";
import { NotificationService } from "src/app/core/services/notification.service";
import { UserService } from "src/app/core/services/user.service";
import { CreateUserAction, DeleteUserAction, GetUsersAction } from "./users.action";

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
    constructor(
        private userService: UserService,
        private notification: NotificationService
    ) {}

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

    @Action(CreateUserAction)
    createUser(context: StateContext<UserStateModel>, action: CreateUserAction): Observable<any> {
        return this.userService.create(action.form)
            .pipe(
                tap((user: User) => {
                    const state = context.getState()
                    context.patchState({
                        usersList: [...state.usersList, user]
                    })
                    this.notification.success('Utilisateur créé')
                }),
                catchError((err) => {
                    this.notification.success('Erreur')
                    throw err
                })
            )
    }

    @Action(DeleteUserAction)
    deleteUser(context: StateContext<UserStateModel>, action: DeleteUserAction): Observable<any> {
        return this.userService.delete(action.id)
            .pipe(
                tap(() => {
                    const state = context.getState()
                    context.patchState({
                        usersList: state.usersList.filter(user => user.id != action.id)
                    })
                    this.notification.success('Utilisateur supprimé')
                }),
                catchError((err) => {
                    this.notification.success('Erreur')
                    throw err
                })
            )
    }
}