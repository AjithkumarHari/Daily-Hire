import { createAction, props } from "@ngrx/store";
import { Credentials } from "../../../../types/Credentials";
import { ErrorRes } from "../../../../types/ErrorRes";
import { Worker } from "src/app/types/Worker";

export const workerBrowserReload = createAction(
    `Worker Reloads the Browser`,
    props<{token: string, workerData: any}>()
)

export const workerLoginRequest = createAction(
    `Auth Worker Login Request`,
    props<{credentials: Credentials}>()
)

export const workerLoginPending = createAction(
    `Auth Worker Login Pending`,
    props<{workerData: any}>()
)

export const workerLoginSuccess = createAction(
    `Auth Worker Login Success`,
    props<{token: string, workerData: Worker}>()
)

export const workerLoginFailure = createAction(
    `Auth Worker Login Failure`,
    props<{error: ErrorRes}>()
)

export const workerSignupRequest = createAction(
    `Auth Worker Signup Request`,
    props<{worker: Worker}>()
)

export const workerSignupSuccess = createAction(
    `Auth Worker Signup Success`,
    props<{workerData: any}>()
)

export const workerSignupFailure = createAction(
    `Auth Worker Signup Failure`,
    props<{error: ErrorRes}>()
)

export const workerVerifyRequest = createAction(
    `Auth Worker Verify Request`,
    props<{worker:{email: string, phoneNumber: number, code: string}}>()
)

export const workerVerifySuccess = createAction(
    `Auth Worker Verify Success`,
    props<{workerToken: string}>()
)

export const workerVerifyFailure = createAction(
    `Auth Worker Verify Failure`,
    props<{error: ErrorRes}>()
)

export const workerBlockBooking = createAction(
    `Auth Worker Block Booking`,
    props<{workerId: string, blockDate: Date}>()
)

export const workerUnBlockBooking = createAction(
    `Auth Worker UnBlock Booking`,
    props<{workerId: string, blockDate: Date}>()
)

export const workerBlockSuccess = createAction(
    `Auth Worker Block Booking Success`,
    props<{workerData: any}>()
)