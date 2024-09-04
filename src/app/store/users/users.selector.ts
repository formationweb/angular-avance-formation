import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserStates } from "./users.reducer";

export const featureUserSelector = createFeatureSelector<UserStates>('users')
export const selectUsersList = createSelector(featureUserSelector, userStates => userStates.usersList)