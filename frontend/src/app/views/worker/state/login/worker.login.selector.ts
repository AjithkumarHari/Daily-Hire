import { createSelector } from "@ngrx/store"; 
import { WorkerState } from "../worker.state";

export const selectWorkerErrorMessage = createSelector(
    (state: any) => state.worker.errorMessage,
    (errorMessage) => errorMessage
)

export const selectWorkerToken = createSelector(
    (state: WorkerState) => state,
    (state) => state
) 

export const selectWorkerDetails = createSelector(
    (state: any) => state.worker.workerData,
    (workerDetails) => workerDetails
) 