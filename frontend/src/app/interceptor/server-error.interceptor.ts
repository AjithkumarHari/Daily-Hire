import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.warn(
          'the interceptor has caught an error',
          error
        );

        if(error.status==404){
          this.router.navigate(['/**']);
        }
        if(error.status==401){
          console.log('unautherized');
          
        }
        return throwError(() => error);
      })
    )
  }
}
