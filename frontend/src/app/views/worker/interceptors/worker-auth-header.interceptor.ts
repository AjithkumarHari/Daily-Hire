import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkerAuthService } from '../services/worker-auth-service.service';

@Injectable()
export class WorekrAuthHeaderInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const workerAuthService = this.injector.get(WorkerAuthService)
    console.log('worker');
    
    const authReq = request.clone({
      
      
      setHeaders : {
        'Content-Type' : 'application/json', 
        Authorization : `Worker-Bearer ${workerAuthService.getToken()}`
      },
    })
    return next.handle(authReq);
  }
}
