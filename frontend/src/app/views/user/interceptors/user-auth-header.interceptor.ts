import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class UserAuthHeaderInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userAuthService = this.injector.get(UserService)

    const authReq = request.clone({
      setHeaders : {
        'Content-Type' : 'application/json',
        Authorization : `User-Bearer ${userAuthService.getToken()}`
      },
    })
    return next.handle(authReq);
  }
}
