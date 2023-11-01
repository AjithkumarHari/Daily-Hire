import { Action, createReducer, on } from "@ngrx/store";
import { loginSuccess, loginFailure } from "./login.action";
import { UserState } from "../user.state";

export const InitialState: UserState =  {
    token: '',
    errorMessage: undefined
}

const _authReducer = createReducer(
    InitialState,
    on(loginSuccess,(state, {token})=>{
        return {
            ...state,
            token,
            errorMessage: undefined
        }
    }),
    on(loginFailure,(state,{error})=>{
        return {
            ...state,
            token: " ",
            errorMessage: error.error.message
        }
    })
)


export function authReducer(state: UserState = InitialState, action: Action){
    return _authReducer(state,action)
}