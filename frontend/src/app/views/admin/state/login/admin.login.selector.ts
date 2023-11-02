import { createSelector } from "@ngrx/store"; 
import { AdminState } from "../admin.state";

export const selectErrorMessage = createSelector(
    (state: any) => state.worker.errorMessage,
    (errorMessage) => errorMessage
)

export const selectToken = createSelector(
    (state: AdminState) => state,
    (state) => state
) 