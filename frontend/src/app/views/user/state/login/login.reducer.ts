import { Action, createReducer, on } from "@ngrx/store";
import { loginSuccess, loginFailure } from "./login.action";
import { UserState } from "../user.state";
import { state } from "@angular/animations";


export const InitialState: UserState =  {
    token: " ",
}

const _authReducer = createReducer(
    InitialState,
    on(loginSuccess,(state, {token})=>{
        return {
            ...state,
            token
        }
    }),
    on(loginFailure,(state,{error})=>{
        return {
            ...state,
            token: " ",
            errorMessage: error
        }
    })
)


export function authReducer(state: UserState = InitialState, action: Action){
    return _authReducer(state,action)
}