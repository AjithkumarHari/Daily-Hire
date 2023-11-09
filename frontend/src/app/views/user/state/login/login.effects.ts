import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user.service";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { loginFailure,
    loginRequest,
    loginSuccess,
    googleLoginRequest,
    signupRequest,
    signupFailure,
    signupSuccess
    } from "./login.action";

@Injectable()

export class AuthEffects{

    constructor( private actions$ : Actions, 
        private userService : UserService,
        private router : Router){}

    login$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginRequest),
            switchMap(({ credentials }) =>
                this.userService.login(credentials).pipe(
                    map(res=>{
                        let responce : any = res;
                        if(responce.token){
                            sessionStorage.setItem('user-token',responce.token)
                            console.log('in side effect LS',responce.message);
                            return loginSuccess({UserToken : responce.token})
                        }else{
                            console.log('in side effect LE',responce);
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
                        console.log(responce.result.user);
                        if(responce.result.user){
                            return signupSuccess({userData : responce.result.user})
                        }else{
                            console.log('in side effect LE',responce);
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



    googleLogin$ = createEffect(()=>
        this.actions$.pipe(
            ofType(googleLoginRequest),
            switchMap(({ user }) =>
                this.userService.signInWithGoogle(user).pipe(
                    map(res=>{
                        let responce : any = res;
                        if(responce.token){
                            sessionStorage.setItem('user-token',responce.token)
                            console.log('in side effect LS',responce.message);
                            return loginSuccess({UserToken : responce.token})
                        }else{
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
            tap(()=>{
                this.router.navigate(['/']);
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
}