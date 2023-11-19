import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';  
import { Worker } from '../../../types/Worker';
import { Service } from 'src/app/types/Service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  server = environment.serverUrl
  constructor( private http: HttpClient) { }

  getAllServices():Observable<Service[]>{
    return this.http.get<Service[]>(`${this.server}/admin/service-list`)
  }
 

}
