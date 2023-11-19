import { Action, createReducer, on } from "@ngrx/store";
import { workerLoginSuccess, workerLoginFailure } from "./worker.login.action";
import { WorkerState } from "../worker.state";

export const initialState: WorkerState = {
    token: "",
    errorMessage: undefined
}

const _authReducer = createReducer(
    initialState,
    on(workerLoginSuccess,(state, {token, workerData})=>{
        return {
            ...state,
            token: token,
            errorMessage: undefined,
            workerData: workerData
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