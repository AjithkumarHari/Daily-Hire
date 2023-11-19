import { createAction, props } from "@ngrx/store";
import { Credentials } from "../../../../types/Credentials";
import { ErrorRes } from "../../../../types/ErrorRes";
import { Worker } from "src/app/types/Worker";

export const workerLoginRequest = createAction(
    `Auth Worker Login Request`,
    props<{credentials: Credentials}>()
)

export const workerLoginSuccess = createAction(
    `Auth Worker Login Success`,
    props<{token: string, workerData: Worker}>()
)

export const workerLoginFailure = createAction(
    `Auth Worker Login Failure`,
    props<{error: ErrorRes}>()
)