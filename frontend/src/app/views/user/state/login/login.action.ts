import { createAction, props } from "@ngrx/store";
import { Credentials } from "../../types/Credentials";
import { ErrorRes } from "../../types/ErrorRes";
import { SocialUser } from "@abacritt/angularx-social-login";

export const loginRequest = createAction(
    `Auth login Request`,
    props<{credentials: Credentials}>()
)

export const googleLoginRequest = createAction(
    `Auth Google login Request`,
    props<{user: SocialUser}>()
)

export const loginSuccess = createAction(
    `Auth Login Success`,
    props<{UserToken: string}>()
)

export const loginFailure = createAction(
    `Auth Login Failure`,
    props<{error: ErrorRes}>()
)