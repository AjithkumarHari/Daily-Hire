import { createAction, props } from "@ngrx/store";
import { Credentials } from "../../types/Credentials";
import { ErrorRes } from "../../types/ErrorRes";

export const adminLoginRequest = createAction(
    `Auth Worker Login Request`,
    props<{credentials: Credentials}>()
)

export const adminLoginSuccess = createAction(
    `Auth Worker Login Success`,
    props<{token: string}>()
)

export const adminLoginFailure = createAction(
    `Auth Worker Login Failure`,
    props<{error: ErrorRes}>()
)