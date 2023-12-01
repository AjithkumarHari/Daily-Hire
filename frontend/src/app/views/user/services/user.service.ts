import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Worker } from '../../../types/Worker';
import { Service } from 'src/app/types/Service';
import { Review } from 'src/app/types/Review';
import { Booking } from 'src/app/types/Booking';
import { User } from 'src/app/types/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  server = environment.serverUrl;
  
  constructor( private http: HttpClient) { }

  setToken(token: string){
    return window.localStorage.setItem('user-token',token);
  }

  getToken(){
    return window.localStorage.getItem('user-token');
  }
  
  deleteToken(){
    window.localStorage.removeItem('user-token');
    window.localStorage.removeItem('user-data');
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

  paymentRequest(paymentDetails: {user: object, worker: Worker, bookingTime: Date}) {
    return this.http.post(`${this.server}/user/book-worker`,paymentDetails)
  }

  addWorkerReview(review: Review){
    return this.http.post(`${this.server}/user/add-review`,review)
  }

  getReviewByWorker(id: string): Observable<Review[]>{
    return this.http.get<Review[]>(`${this.server}/user/review-list/${id}`)
  }
  
  getBookingByUser(email: string): Observable<Booking[]>{
    return this.http.get<Booking[]>(`${this.server}/user/booking-list/${email}`)
  }
  
  getBookingByWorker(id: string): Observable<Booking[]>{
    return this.http.get<Booking[]>(`${this.server}/user/worker-booked-list/${id}`)
  }

  bookingCancelRequest(bookingId: string){
    return this.http.put(`${this.server}/user/booking-cancel`,{bookingId})
  }

  updateProfile(userId: string, user: User){
    return this.http.put(`${this.server}/user/edit-user`,{userId, user} )
  }
   
}
