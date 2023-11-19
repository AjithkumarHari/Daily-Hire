import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';

@Injectable()
export class AdminAuthHeaderInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const adminAuthService = this.injector.get(AdminAuthService)

    const authReq = request.clone({
      setHeaders : {
        'Content-Type' : 'application/json',
        Authorization : `Admin-Bearer ${adminAuthService.getToken()}`
      },
    })
    return next.handle(authReq);
  }
}
