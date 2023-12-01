import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';  
import { Observable } from 'rxjs';
import { User } from '../../../types/User';
import { Worker } from '../../../types/Worker';
import { Service } from 'src/app/types/Service';
import { Review } from 'src/app/types/Review';
import { Booking } from 'src/app/types/Booking';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  server = environment.serverUrl;
  constructor( private http: HttpClient) { }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.server}/admin/user-list`);
  }

  changeUserStatus(userId: string){
    return this.http.put(`${this.server}/admin/user-status`,{userId});
  }

  getAllWorkers():Observable<Worker[]>{
    return this.http.get<Worker[]>(`${this.server}/admin/worker-list`);
  }
  
  changeWorkerStatus(workerId: string){
    return this.http.put(`${this.server}/admin/worker-status`,{workerId});
  }

  getAllServices():Observable<Service[]>{
    return this.http.get<Service[]>(`${this.server}/admin/service-list`);
  }

  changeServiceStatus(serviceId: string){
    return this.http.put(`${this.server}/admin/service-status`,{serviceId});
  }

  addService(data: {name: string, description: string}){
    return this.http.post(`${this.server}/admin/add-service`,data);
  }

  editService(data: {_id: string, name: string, description: string}){
    return this.http.put(`${this.server}/admin/edit-service`,data);
  }

  getServiceById(serviceId: string):Observable<Service>{
    return this.http.get<Service>(`${this.server}/admin/service-details/:${serviceId}`);
  }

  getAllReviews(): Observable<Review[]>{
    return this.http.get<Review[]>(`${this.server}/admin/review-list`);
  }

  changeReviewStatus(reviewId: string){
    return this.http.put(`${this.server}/admin/review-status`,{reviewId});
  }

  getAllBookings(): Observable<Booking[]>{
    return this.http.get<Booking[]>(`${this.server}/admin/booking-list`);
  }

  changeBookingStatus(bookingId: string){
    return this.http.put(`${this.server}/admin/booking-status`,{bookingId});
  }

}
