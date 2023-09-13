import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { User } from "../core/user.interface";
import { CreateUserAction, DeleteUserAction, GetUsersAction } from "./users.action";
import { Observable, catchError, tap } from "rxjs";
import { UserService } from "../core/services/user.service";
import { NotificationService } from "../core/services/notification.service";

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
                    //const state = context.getState()
                    context.patchState({
                        usersList: users,
                        loading: true
                    })
                })
            )
    }

    @Action(CreateUserAction)
    createAction(context: StateContext<UserStateModel>, action: CreateUserAction): Observable<any> {
        return this.userService.create(action.form)
            .pipe(
                tap((userCreated: User) => {
                    const state = context.getState()
                    context.patchState({
                        usersList: [...state.usersList, userCreated]
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
    deleteAction(context: StateContext<UserStateModel>, action: DeleteUserAction): Observable<any> {
        const { userId } = action
        return this.userService.delete(userId)
            .pipe(
                tap(() => {
                    const state = context.getState()
                    context.patchState({
                        usersList: state.usersList.filter(user => user.id != userId)
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