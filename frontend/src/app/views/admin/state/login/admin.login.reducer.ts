import { Action, createReducer, on } from "@ngrx/store";
import { adminLoginSuccess, adminLoginFailure } from "./admin.login.action";
import { AdminState } from "../admin.state";

export const initialState: AdminState = {
    token: "",
    errorMessage: undefined
}

const _authReducer = createReducer(
    initialState,
    on(adminLoginSuccess,(state, {token})=>{
        return {
            ...state,
            token,
            errorMessage: undefined
        }
    }),
    on(adminLoginFailure,(state,{error})=>{
        return {
            ...state,
            token: " ",
            errorMessage: error.error.message
        }
    })
)


export function authReducer(state: AdminState = initialState, action: Action){
    return _authReducer(state,action)
}