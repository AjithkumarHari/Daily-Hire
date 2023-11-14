import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';  
import { Observable } from 'rxjs';
import { User } from '../../../types/User';
import { Worker } from '../../../types/Worker';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  server = environment.serverUrl
  constructor( private http: HttpClient) { }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.server}/admin/user-list`)
  }

  getAllWorkers():Observable<Worker[]>{
    return this.http.get<Worker[]>(`${this.server}/admin/worker-list`)
  }

  changeUserStatus(userId: string){
    return this.http.put(`${this.server}/admin/user-status`,{userId})
  }

  changeWorkerStatus(workerId: string){
    return this.http.put(`${this.server}/admin/worker-status`,{workerId})
  }

}
