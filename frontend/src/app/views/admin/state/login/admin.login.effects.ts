import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AdminAuthService } from "../../services/admin-auth.service";
import { adminLoginFailure, adminLoginRequest, adminLoginSuccess } from "./admin.login.action";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Injectable()

export class AuthEffects{

    constructor( private actions$ : Actions, 
        private adminService : AdminAuthService,
        private router : Router){}

    login$ = createEffect(()=>
        this.actions$.pipe(
            ofType(adminLoginRequest),
            switchMap(({ credentials }) =>
                this.adminService.login(credentials).pipe(
                    map(res=>{
                        let responce : any = res;
                        if(responce.token){
                            sessionStorage.setItem('admin-token',responce.token)
                            return adminLoginSuccess({token : responce.token})
                        }else{
                            console.log('in side effect LE',responce);
                            return adminLoginFailure({ error : responce.error.error  })
                        }
                    }),
                    catchError(error => of (adminLoginFailure({ error })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(()=>
        this.actions$.pipe(
            ofType(adminLoginSuccess),
            tap(()=>{
                this.router.navigate(['/admin/dashboard']);
            })
        ), {
            dispatch : false
        }
    );

    loginFailure$ = createEffect(()=>
        this.actions$.pipe(
            ofType(adminLoginFailure),
            tap(()=>{
                this.router.navigate(['/admin/auth'])
            })
        ), {
            dispatch: false
        }
    );
}