import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../../../types/Credentials';
import { environment } from 'src/environments/environment';  
import { Worker } from '../../../types/Worker';


@Injectable({
  providedIn: 'root'
})
export class WorkerAuthService {
  server = environment.serverUrl
  constructor( private http: HttpClient) { }

  signup(worker: Worker){
    return this.http.post(`${this.server}/auth/worker-signup`, worker)
  }

  login(credentials: Credentials){
    return this.http.post(`${this.server}/auth/worker-login`,credentials)
  }

  verifySignupOtp(data: {email: string, phoneNumber: number, code: string}){  
    console.log(data);
      
    return this.http.post(`${this.server}/auth/worker-otp`,data);
  }
  
  resendOtp(phoneNumber:number){
    return this.http.post(`${this.server}/auth/user-resend-otp`,phoneNumber);
  }

  setToken(token: string){
    return window.sessionStorage.setItem('worker-token',token)
  }

  getToken(){
    return window.sessionStorage.getItem('worker-token')
  }
  deleteToken(){
    return window.sessionStorage.removeItem('worker-token')
  }

}
