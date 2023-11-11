import { Action, createReducer, on } from "@ngrx/store";
import { loginSuccess, loginFailure ,signupSuccess, signupFailure, loginPending, verifySuccess, verifyFailure} from "./login.action";
import { UserState } from "../user.state";

export const InitialState: UserState =  {
    UserToken: '',
    errorMessage: undefined
}

const _authReducer = createReducer(
    InitialState,
    on(loginSuccess,(state, {userToken})=>{
        return {
            ...state,
            UserToken : userToken,
            errorMessage: undefined
        }
    }),
    on(loginPending,(state, {userData})=>{
        return {
            ...state,
            ...userData,
            errorMessage: undefined
        }
    }),
    on(loginFailure,(state,{error})=>{
        return {
            ...state,
            UserToken: " ",
            errorMessage: error.error.message
        }
    }),
    on(signupSuccess,(state, {userData})=>{
        return {
            ...state,
            ...userData,
            errorMessage: undefined
        }
    }),
    on(signupFailure,(state,{error})=>{
        return {
            ...state,
            UserToken: " ",
            errorMessage: error.error.message
        }
    }),
    on(verifySuccess,(state, {userToken})=>{
        return {
            ...state,
            UserToken : userToken,
            errorMessage: undefined
        }
    }),
    on(verifyFailure,(state,{error})=>{
        return {
            ...state,
            UserToken: " ",
            errorMessage: error.error.message
        }
    })
) 


export function authReducer(state: UserState = InitialState, action: Action){
    return _authReducer(state,action)
}