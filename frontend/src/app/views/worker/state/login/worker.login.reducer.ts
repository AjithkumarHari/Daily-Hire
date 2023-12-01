import { Action, createReducer, on } from "@ngrx/store";
import { workerLoginSuccess, workerLoginFailure, workerSignupSuccess, workerSignupFailure, workerVerifySuccess, workerVerifyFailure, workerLoginPending, workerBrowserReload } from "./worker.login.action";
import { WorkerState } from "../worker.state";

export const initialState: WorkerState = {
    token: "",
    errorMessage: undefined
}

const _authReducer = createReducer(
    initialState,
    on(workerBrowserReload,(state, {token, workerData})=>{
        return {
            ...state,
            token: token,
            workerData: workerData,
            errorMessage: undefined
        }
    }),
    on(workerLoginSuccess,(state, {token, workerData})=>{
        return {
            ...state,
            token: token,
            errorMessage: undefined,
            workerData: workerData
        }
    }),
    on(workerLoginPending,(state, {workerData})=>{
        return {
            ...state,
            ...workerData,
            errorMessage: undefined
        }
    }),
    on(workerLoginFailure,(state,{error})=>{
        return {
            ...state,
            token: " ",
            errorMessage: error.error.message
        }
    }),

    on(workerSignupSuccess,(state, {workerData})=>{
        return {
            ...state,
            ...workerData,
            errorMessage: undefined
        }
    }),
    on(workerSignupFailure,(state,{error})=>{
        return {
            ...state,
            UserToken: " ",
            errorMessage: error.error.message
        }
    }),

    on(workerVerifySuccess,(state, {workerToken})=>{
        return {
            ...state,
            UserToken : workerToken,
            errorMessage: undefined
        }
    }),
    on(workerVerifyFailure,(state,{error})=>{
        return {
            ...state,
            UserToken: " ",
            errorMessage: error.error.message
        }
    })
    
)


export function authReducer(state: WorkerState = initialState, action: Action){
    return _authReducer(state,action)
}