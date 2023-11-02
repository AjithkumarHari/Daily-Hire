import { Action, createReducer, on } from "@ngrx/store";
import { workerLoginSuccess, workerLoginFailure } from "./worker.login.action";
import { WorkerState } from "../worker.state";

export const initialState: WorkerState = {
    token: "",
    errorMessage: undefined
}

const _authReducer = createReducer(
    initialState,
    on(workerLoginSuccess,(state, {token})=>{
        return {
            ...state,
            token,
            errorMessage: undefined
        }
    }),
    on(workerLoginFailure,(state,{error})=>{
        return {
            ...state,
            token: " ",
            errorMessage: error.error.message
        }
    })
)


export function authReducer(state: WorkerState = initialState, action: Action){
    return _authReducer(state,action)
}