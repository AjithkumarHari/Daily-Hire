import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserAuthService } from "../../services/user.auth.service";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { loginFailure,
    loginRequest,
    loginSuccess,
    googleLoginRequest,
    signupRequest,
    signupFailure,
    signupSuccess,
    loginPending,
    verifyRequest
    } from "./login.action";

@Injectable()

export class AuthEffects{

    constructor( private actions$ : Actions, 
        private userService : UserAuthService,
        private router : Router){}

    login$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginRequest),
            switchMap(({ credentials }) =>
                this.userService.login(credentials).pipe(
                    map(res=>{
                        let responce : any = res;
                        if(responce.status=='success'){
                            sessionStorage.setItem('user-token',responce.token)
                            return loginSuccess({userToken : responce.token})
                        }
                        else if(responce.status=='pending'){
                            return loginPending({userData : responce})
                        }
                        else{
                            console.log('in side effect LE',responce);
                            return loginFailure({ error : responce.error.error  })
                        }
                    }),
                    catchError(error => of (loginFailure({ error })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginSuccess),
            tap(( )=>{
                this.router.navigate(['/']);  
            })
        ), {
            dispatch : false
        }
    );

    loginPending$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginPending),
            tap(( )=>{
                this.router.navigate(['/auth/otp']);
            })
        ), {
            dispatch : false
        }
    );

    loginFailure$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginFailure),
            tap(()=>{
                this.router.navigate(['/auth/login'])
            })
        ), {
            dispatch: false
        }
    );

    
    googleLogin$ = createEffect(()=>
        this.actions$.pipe(
            ofType(googleLoginRequest),
            switchMap(({ user }) =>
                this.userService.signInWithGoogle(user).pipe(
                    map(res=>{
                        let responce : any = res;``
                        if(responce.token){
                            sessionStorage.setItem('user-token',responce.token)
                            return loginSuccess({userToken : responce.token})
                        }else{
                            return loginFailure({ error : responce.error.error  })
                        }
                    }),
                    catchError(error => of (loginFailure({ error })))
                )
            )
        )
    );

    signup$ = createEffect(()=>
        this.actions$.pipe(
            ofType(signupRequest),
            switchMap(({ user }) =>
                this.userService.signup(user).pipe(
                    map(res=>{
                        let responce : any = res;
                        if(responce.status=='success'){
                            return signupSuccess({userData : responce})
                        }else{
                            return signupFailure({ error : responce.error.error  })
                        }
                    }),
                    catchError(error => of (signupFailure({ error })))
                )
            )
        )
    );

    signupSuccess$ = createEffect(()=>
        this.actions$.pipe(
            ofType(signupSuccess),
            tap(()=>{
                this.router.navigate(['/auth/otp']);
            })
        ), {
            dispatch : false
        }
    );

    signupFailure$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginFailure),
            tap(()=>{
                this.router.navigate(['/auth/signup'])
            })
        ), {
            dispatch: false
        }
    );

    verify$ = createEffect(()=>
        this.actions$.pipe(
            ofType(verifyRequest),
            switchMap(({ user }) =>
                this.userService.verifySignupOtp(user).pipe(
                    map(res=>{
                        let responce : any = res;
                        if(responce.status=='success'){
                            sessionStorage.setItem('user-token',responce.token)
                            return loginSuccess({userToken : responce.token})
                        }
                        else{
                            console.log('in side effect LE',responce);
                            return loginFailure({ error : responce.error  })
                        }
                    }),
                    catchError(error => of (loginFailure({ error })))
                )
            )
        )
    );

    // loginSuccess$ = createEffect(()=>
    //     this.actions$.pipe(
    //         ofType(loginSuccess),
    //         tap(( )=>{
    //             this.router.navigate(['/']);  
    //         })
    //     ), {
    //         dispatch : false
    //     }
    // );

    // loginPending$ = createEffect(()=>
    //     this.actions$.pipe(
    //         ofType(loginPending),
    //         tap(( )=>{
    //             this.router.navigate(['/auth/otp']);
    //         })
    //     ), {
    //         dispatch : false
    //     }
    // );

    verifyFailure$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginFailure),
            tap(()=>{
                this.router.navigate(['/auth/otp'])
            })
        ), {
            dispatch: false
        }
    );



}