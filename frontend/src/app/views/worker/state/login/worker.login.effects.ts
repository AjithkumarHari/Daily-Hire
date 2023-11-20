import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { WorkerAuthService } from "../../services/worker-auth-service.service";
import { workerLoginFailure, workerLoginRequest, workerLoginSuccess, workerSignupFailure, workerSignupRequest, workerSignupSuccess, workerVerifyRequest, workerVerifySuccess } from "./worker.login.action";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Injectable()

export class AuthEffects{

    constructor( private actions$ : Actions, 
        private workerService : WorkerAuthService,
        private router : Router){}

    login$ = createEffect(()=>
        this.actions$.pipe(
            ofType(workerLoginRequest),
            switchMap(({ credentials }) =>
                this.workerService.login(credentials).pipe(
                    map(res=>{
                        let responce : any = res;
                        if(responce.token){ 
                            sessionStorage.setItem('worker-token',responce.token)
                            console.log('in side effect LS',responce);
                            return workerLoginSuccess({token : responce.token, workerData: responce.workerData})
                        }else{
                            console.log('in side effect LE',responce);
                            return workerLoginFailure({ error : responce.error.error  })
                        }
                    }),
                    catchError(error => of (workerLoginFailure({ error })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(()=>
        this.actions$.pipe(
            ofType(workerLoginSuccess),
            tap(()=>{
                this.router.navigate(['/worker']);
            })
        ), {
            dispatch : false
        }
    );

    loginFailure$ = createEffect(()=>
        this.actions$.pipe(
            ofType(workerLoginFailure),
            tap(()=>{
                this.router.navigate(['/worker/auth/login'])
            })
        ), {
            dispatch: false
        }
    );

    signup$ = createEffect(()=>
        this.actions$.pipe(
            ofType(workerSignupRequest),
            switchMap(({ worker }) =>
            
            this.workerService.signup(worker).pipe(
                map(res=>{
                    let responce : any = res;
                    if(responce.status=='success'){
                            return workerSignupSuccess({workerData : responce})
                        }else{
                            return workerSignupFailure({ error : responce.error.error  })
                        }
                    }),
                    catchError(error => of (workerSignupFailure({ error })))
                )
            )
        )
    );

    signupSuccess$ = createEffect(()=>
        this.actions$.pipe(
            ofType(workerSignupSuccess),
            tap(()=>{
                this.router.navigate(['/worker/auth/otp']);
            })
        ), {
            dispatch : false
        }
    );

    signupFailure$ = createEffect(()=>
        this.actions$.pipe(
            ofType(workerLoginFailure),
            tap(()=>{
                this.router.navigate(['/worker/auth/signup'])
            })
        ), {
            dispatch: false
        }
    );

    verify$ = createEffect(()=>
        this.actions$.pipe(
            ofType(workerVerifyRequest),
            switchMap(({ worker }) =>
                this.workerService.verifySignupOtp(worker).pipe(
                    map(res=>{
                        let responce : any = res;
                        if(responce.status=='success'){
                            console.log('verify req',responce);
                            
                            sessionStorage.setItem('worker-token',responce.token)
                            return workerLoginSuccess({token : responce.token, workerData: responce.workerData})
                        }
                        else{
                            console.log('in side effect LE',responce);
                            return workerSignupFailure({ error : responce.error  })
                        }
                    }),
                    catchError(error => of (workerSignupFailure({ error })))
                )
            )
        )
    );

    verifySuccess$ = createEffect(()=>
        this.actions$.pipe(
            ofType(workerVerifySuccess),
            tap(()=>{
                console.log('otp verify success');
                
                this.router.navigate(['/worker/'])
            })
        ), {
            dispatch: false
        }
    );

 

    verifyFailure$ = createEffect(()=>
        this.actions$.pipe(
            ofType(workerSignupFailure),
            tap(()=>{
                console.log('otp verify failure');
                
                this.router.navigate(['/worker/auth/otp'])
            })
        ), {
            dispatch: false
        }
    );

    
}