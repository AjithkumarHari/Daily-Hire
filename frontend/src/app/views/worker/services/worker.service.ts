import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';  
import { Worker } from '../../../types/Worker';
import { Service } from 'src/app/types/Service';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/types/Booking';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  server = environment.serverUrl
  constructor( private http: HttpClient) { }

  getAllServices():Observable<Service[]>{
    return this.http.get<Service[]>(`${this.server}/admin/service-list`)
  }

  getAllBooking(id: string):Observable<Booking[]>{
    return this.http.get<Booking[]>(`${this.server}/worker/bookings/${id}`)
  }
 
  bookingCancel(bookingId: string){
    return this.http.put(`${this.server}/worker/cancel-booking`,{bookingId})
  }

  blockBooking(workerId: string, blockDate: Date){
    return this.http.put(`${this.server}/worker/block-booking`,{workerId, blockDate })
  }

}
