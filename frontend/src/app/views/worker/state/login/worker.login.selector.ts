import { createSelector } from "@ngrx/store"; 
import { WorkerState } from "../worker.state";

export const selectErrorMessage = createSelector(
    (state: any) => state.worker.errorMessage,
    (errorMessage) => errorMessage
)

export const selectToken = createSelector(
    (state: WorkerState) => state,
    (state) => state
) 