import { createAction, props } from "@ngrx/store";
import { Credentials } from "../../types/Credentials";
import { ErrorRes } from "../../types/ErrorRes";

export const adminLoginRequest = createAction(
    `Auth Admin Login Request`,
    props<{credentials: Credentials}>()
)

export const adminLoginSuccess = createAction(
    `Auth Admin Login Success`,
    props<{token: string}>()
)

export const adminLoginFailure = createAction(
    `Auth Admin Login Failure`,
    props<{error: ErrorRes}>()
)