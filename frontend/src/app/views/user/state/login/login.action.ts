import { createAction, props } from "@ngrx/store";
import { Credentials } from "../../types/Credentials";
import { ErrorRes } from "../../types/ErrorRes";

export const loginRequest = createAction(
    `Auth login Request`,
    props<{credentials: Credentials}>()
)

export const loginSuccess = createAction(
    `Auth Login Success`,
    props<{token: string}>()
)

export const loginFailure = createAction(
    `Auth Login Failure`,
    props<{error: ErrorRes}>()
)