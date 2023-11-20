import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Worker } from '../../../types/Worker';
import { Service } from 'src/app/types/Service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  server = environment.serverUrl;
  
  constructor( private http: HttpClient) { }

  setToken(token: string){
    return window.sessionStorage.setItem('user-token',token);
  }

  getToken(){
    return window.sessionStorage.getItem('user-token');
  }
  
  deleteToken(){
    return window.sessionStorage.removeItem('user-token')
  }

  allWorkers():Observable<Worker[]> {
    return this.http.get<Worker[]>(`${this.server}/user/worker-list`);
  }

  getWorkerById (id: string):Observable<Worker> {
    return this.http.get<Worker>(`${this.server}/user/worker-details/${id}`);
  }

  allServices():Observable<Service[]>{
    return this.http.get<Service[]>(`${this.server}/user/service-list`)
  }
   
}
