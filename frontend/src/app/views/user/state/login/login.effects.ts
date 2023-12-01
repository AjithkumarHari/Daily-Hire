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
    verifyRequest,
    verifyFailure,
    editProfileRequest,
    editProfileSuccess
    } from "./login.action";
import { UserService } from "../../services/user.service";

@Injectable()

export class AuthEffects{

    constructor( private actions$ : Actions, 
        private userAuthService : UserAuthService,
        private userService: UserService,
        private router : Router){}

    login$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginRequest),
            switchMap(({ credentials }) =>
                this.userAuthService.login(credentials).pipe(
                    map(res=>{
                        let responce : any = res;
                        console.log('res from eff',responce);
                        
                        if(responce.status=='success'){
                            localStorage.setItem('user-token',responce.token)
                            localStorage.setItem('user-data',JSON.stringify(responce.userData))
                            return loginSuccess({userToken : responce.token, userData: responce.userData})
                        }
                        else if(responce.status=='pending'){
                            return loginPending({userData : responce})
                        }
                        else{
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
                console.log('pending true');
                
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
                this.userAuthService.signInWithGoogle(user).pipe(
                    map(res=>{
                        let responce : any = res;``
                        if(responce.token){
                            console.log(responce);
                            
                            localStorage.setItem('user-token',responce.token)
                            localStorage.setItem('user-data',JSON.stringify(responce.userData))
                            return loginSuccess({userToken : responce.token, userData: responce.userData})
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
                this.userAuthService.signup(user).pipe(
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
                console.log('signup sussc');
                
                this.router.navigate(['/auth/otp']);
            })
        ), {
            dispatch : false
        }
    );

    signupFailure$ = createEffect(()=>
        this.actions$.pipe(
            ofType(signupFailure),
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
                this.userAuthService.verifySignupOtp(user).pipe(
                    map(res=>{
                        let responce : any = res;
                        if(responce.status=='success'){
                            localStorage.setItem('user-token',responce.token)
                            localStorage.setItem('user-data',JSON.stringify(responce.userData))
                            return loginSuccess({userToken : responce.token, userData: responce.userData})
                        }
                        else{
                            console.log('in side effect LE',responce);
                            return verifyFailure({ error : responce.error  })
                        }
                    }),
                    catchError(error => of (verifyFailure({ error })))
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
            ofType(verifyFailure),
            tap(()=>{
                console.log('verfy falure');
                this.router.navigate(['/auth/otp'])
            })
        ), {
            dispatch: false
        }
    );

    update$ = createEffect(()=>
        this.actions$.pipe(
            ofType(editProfileRequest),
            switchMap(({ userId, user }) =>
                this.userService.updateProfile(userId, user).pipe(
                    map(res=>{
                        let responce : any = res;
                        console.log('effect U');
                        
                        console.log(responce);
                        if(responce.status=='success'){
                            
                            console.log(responce.userData);
                            
                            localStorage.setItem('user-data',JSON.stringify(responce.userData))
                            return editProfileSuccess({ userData: responce.userData})
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
            ofType(editProfileSuccess),
            tap(()=>{

                this.router.navigate(['/profile/updateProfile'])
            })
        ), {
            dispatch : false
        }
    );

}