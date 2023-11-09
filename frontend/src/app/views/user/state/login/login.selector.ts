import { createSelector } from '@ngrx/store';
import { UserState } from '../user.state';

export const selectErrorMessage = createSelector(
    (state: any) => state.user.errorMessage,
    (errorMessage) => errorMessage
) 

export const selectToken = createSelector(
    (state: UserState) => state,
    (state) => state
) 

export const selectUserData = createSelector(
    (state: any) => state.user.userData,
    (userData) => userData
) 