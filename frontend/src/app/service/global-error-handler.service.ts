import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor() { }
  handleError(error: Error | HttpErrorResponse): void {
 
    if (error instanceof HttpErrorResponse) {
      // Serve error
      console.log('server error',error)
    } else {
      // client error
      //  console.warn('client error',error);   
    }
  } 
}
