import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { User } from './types/User';
import { Credentials } from './types/Credentials';
import { Observable } from 'rxjs';
import { Worker } from '../worker/types/Worker';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  server = environment.serverUrl;
  
  constructor( private http: HttpClient) { }

  signup(user: User){
    return this.http.post(`${this.server}/auth/user-signup`, user);
  }

  login(credentials: Credentials){
    return this.http.post(`${this.server}/auth/user-login`,credentials);
  }

  setToken(token: string){
    return window.sessionStorage.setItem('user-token',token);
  }

  getToken(){
    return window.sessionStorage.getItem('user-token');
  }

  allWorkers():Observable<Worker[]> {
    return this.http.get<Worker[]>(`${this.server}/user/worker-list`);
  }

  getWorkerById (id: string):Observable<Worker> {
    return this.http.get<Worker>(`${this.server}/user/worker-details/${id}`);
  }
  deleteToken(){
    return window.sessionStorage.removeItem('user-token')
  }
}
