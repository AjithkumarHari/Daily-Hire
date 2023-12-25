import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { WorkerAuthService } from "../../services/worker-auth-service.service";
import { WorkerService } from "../../services/worker.service";
import { editWorkerProfileRequest, editWorkerProfileSuccess, workerBlockBooking, workerBlockSuccess, workerLoginFailure, workerLoginPending, workerLoginRequest, workerLoginSuccess, workerSignupFailure, workerSignupRequest, workerSignupSuccess, workerUnBlockBooking, workerVerifyRequest, workerVerifySuccess } from "./worker.login.action";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Injectable()

export class AuthEffects{

    constructor( private actions$ : Actions, 
        private workerAuthService : WorkerAuthService,
        private workerService : WorkerService,
        private router : Router){}

    login$ = createEffect(()=>
        this.actions$.pipe(
            ofType(workerLoginRequest),
            switchMap(({ credentials }) =>
                this.workerAuthService.login(credentials).pipe(
                    map(res=>{
                        console.log(res);
                        
                        let responce : any = res;
                        if(responce.token){ 
                            localStorage.setItem('worker-token',responce.token)
                            localStorage.setItem('worker-data',JSON.stringify(responce.workerData))
                            console.log('in side effect LS',responce);
                            return workerLoginSuccess({token : responce.token, workerData: responce.workerData})
                        }
                        else if(responce.status=='pending'){
                            console.log(responce);
                            return workerLoginPending({workerData : responce})
                        }
                        else{
                            console.log('in side effect LE',responce);
                            return workerLoginFailure({ error : responce.error.error  })
                        }
                    }),
                    catchError(error => of (workerLoginFailure({ error })))
                )
            )
        )
    ); 

    loginPending$ = createEffect(()=>
        this.actions$.pipe(
            ofType(workerLoginPending),
            tap(( )=>{
                this.router.navigate(['/worker/auth/otp']);
            })
        ), {
            dispatch : false
        }
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
            
            this.workerAuthService.signup(worker).pipe(
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
            ofType(workerSignupFailure),
            tap(()=>{
                console.log('signup failure');
                
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
                this.workerAuthService.verifySignupOtp(worker).pipe(
                    map(res=>{
                        let responce : any = res;
                        if(responce.status=='success'){
                            console.log('verify req',responce);
                            
                            localStorage.setItem('worker-token',responce.token)
                            localStorage.setItem('worker-data',JSON.stringify(responce.workerData))
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


    block$ = createEffect(()=>
        this.actions$.pipe(
            ofType(workerBlockBooking),
            switchMap(({ workerId,blockDate }) =>
                this.workerService.blockBooking(workerId,blockDate).pipe(
                    map(res=>{
                        let responce : any = res;
                        if(responce.status=='success'){
                            console.log('verify req',responce.workerData);
                            localStorage.setItem('worker-data',JSON.stringify(responce.workerData))
                            return workerBlockSuccess({ workerData: responce.workerData})
                        }
                        else{
                            console.log('in side effect LE',responce);
                            return responce
                        }
                    }),
                     
                )
            )
        )
    );
    unblock$ = createEffect(()=>
        this.actions$.pipe(
            ofType(workerUnBlockBooking),
            switchMap(({ workerId,blockDate }) =>
                this.workerService.unBlockBooking(workerId,blockDate).pipe(
                    map(res=>{
                        let responce : any = res;
                        if(responce.status=='success'){
                            console.log('verify req',responce.workerData);
                            localStorage.setItem('worker-data',JSON.stringify(responce.workerData))
                            return workerBlockSuccess({ workerData: responce.workerData})
                        }
                        else{
                            console.log('in side effect LE',responce);
                            return responce
                        }
                    }),
                     
                )
            )
        )
    );

    blockSuccess$ = createEffect(()=>
        this.actions$.pipe(
            ofType(workerVerifySuccess),
            tap(()=>{
                console.log('block success');
                
                this.router.navigate(['/worker/schedule'])
            })
        ), {
            dispatch: false
        }
    );

 













































    update$ = createEffect(()=>
        this.actions$.pipe(
            ofType(editWorkerProfileRequest),
            switchMap(({ workerId, worker }) =>
                this.workerService.updateProfile(workerId, worker).pipe(
                    map(res=>{
                        let responce : any = res;
                        console.log('effect U');
                        
                        console.log(responce);
                        if(responce.status=='success'){
                            
                            console.log(responce.workerData);
                            localStorage.setItem('worker-data',JSON.stringify(responce.workerData))
                            return editWorkerProfileSuccess({ workerData: responce.workerData})
                        }
                        else{
                            console.log('in side effect LE',responce);
                            return responce;
                        }
                    }),
                  
                )
            )
        )
    );

    updateSuccess$ = createEffect(()=>
    this.actions$.pipe(
        
        ofType(editWorkerProfileSuccess),
        tap(()=>{
                console.log('sucess');
                this.router.navigate(['/worker'])
            })
        ), {
            dispatch : false
        }
    );
 

    
}