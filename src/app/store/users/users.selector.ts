import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "./users.reducer";

export const selectFeatureUsers = createFeatureSelector<UsersState>('users')
export const selectUsersList = createSelector(selectFeatureUsers, usersState => usersState.usersList)
export const selectLoading = createSelector(selectFeatureUsers, usersState => usersState.loading)