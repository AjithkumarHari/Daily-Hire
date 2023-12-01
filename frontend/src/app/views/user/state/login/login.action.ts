import { createAction, props } from "@ngrx/store";
import { Credentials } from "../../../../types/Credentials";
import { ErrorRes } from "../../../../types/ErrorRes";
import { SocialUser } from "@abacritt/angularx-social-login";
import { User } from "../../../../types/User";

export const browserReload = createAction(
    `User Reloads the Browser`,
    props<{userToken: string, userData: any}>()
)

export const editProfileRequest = createAction(
    `User Updates the Profile`,
    props<{userId: string, user: User}>()
)

export const editProfileSuccess = createAction(
    `User Updates the Profile`,
    props<{userData: any}>()
)

export const loginRequest = createAction(
    `Auth Login Request`,
    props<{credentials: Credentials}>()
)

export const googleLoginRequest = createAction(
    `Auth Google Login Request`,
    props<{user: SocialUser}>()
)

export const loginSuccess = createAction(
    `Auth Login Success`,
    props<{userToken: string, userData: any}>()
)

export const loginPending = createAction(
    `Auth Login Pending`,
    props<{userData: any}>()
)

export const loginFailure = createAction(
    `Auth Login Failure`,
    props<{error: ErrorRes}>()
)

export const signupRequest = createAction(
    `Auth Signup Request`,
    props<{user: User}>()
)

export const signupSuccess = createAction(
    `Auth Signup Success`,
    props<{userData: any}>()
)

export const signupFailure = createAction(
    `Auth Signup Failure`,
    props<{error: ErrorRes}>()
)

export const verifyRequest = createAction(
    `Auth Verify Request`,
    props<{user:{email: string, phoneNumber: number, code: string}}>()
)

export const verifySuccess = createAction(
    `Auth Verify Success`,
    props<{userToken: string}>()
)

export const verifyFailure = createAction(
    `Auth Verify Failure`,
    props<{error: ErrorRes}>()
)