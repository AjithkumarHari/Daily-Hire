import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { WorkerAuthService } from "../../services/worker-auth-service.service";
import { workerLoginFailure, workerLoginRequest, workerLoginSuccess } from "./worker.login.action";
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
}