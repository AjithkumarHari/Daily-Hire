import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../../types/Credentials';
import { environment } from 'src/environments/environment';  
import { Worker } from '../../types/Worker';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  server = environment.serverUrl
  constructor( private http: HttpClient) { }

  signup(worker: Worker){
    return this.http.post(`${this.server}/auth/worker-signup`, worker)
  }

  login(credentials: Credentials){
    return this.http.post(`${this.server}/auth/worker-login`,credentials)
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
