import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';  
import { Credentials } from './types/Credentials';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  server = environment.serverUrl
  constructor( private http: HttpClient) { }

  login(credentials: Credentials){
    return this.http.post(`${this.server}/auth/admin-login`,credentials)
  }

  setToken(token: string){
    return window.sessionStorage.setItem('worker-token',token)
  }

  getToken(){
    return window.sessionStorage.getItem('worker-token')
  }
}
