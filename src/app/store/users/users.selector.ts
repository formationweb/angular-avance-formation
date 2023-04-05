import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./users.reducer";

export const selectFeatureUsers = createFeatureSelector<UserState>('users')
export const selectUsersList = createSelector(selectFeatureUsers, userStates => userStates.usersList)
export const selectUsersLoading = createSelector(selectFeatureUsers, userStates => userStates.loading)