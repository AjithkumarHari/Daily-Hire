import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Worker } from '../../../types/Worker';
import { Service } from 'src/app/types/Service';
import { Review } from 'src/app/types/Review';
import { Booking } from 'src/app/types/Booking';
import { User } from 'src/app/types/User';
import { Wallet } from 'src/app/types/Wallet';
import { Complaint } from 'src/app/types/Complaint';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  server = environment.serverUrl;
  private socket: any
  
  constructor( private http: HttpClient) {
    this.socket = io('http://dailyhire.ajithkumarhari.co')
   }
   

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

  paymentRequest(paymentDetails: {user: object, worker: Worker, bookingTime: Date, paymentMethod: string}) {
    return this.http.post(`${this.server}/user/book-worker`,paymentDetails)
  }

  addWorkerReview(review: Review){
    return this.http.post(`${this.server}/user/add-review`,review)
  }

  getReviewByWorker(id: string): Observable<Review[]>{
    return this.http.get<Review[]>(`${this.server}/user/review-list/${id}`)
  }
  
  getBookingByUser(id: string): Observable<Booking[]>{
    return this.http.get<Booking[]>(`${this.server}/user/booking-list/${id}`)
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

  getWalletByUser(id: string): Observable<Wallet>{
    return this.http.get<Wallet>(`${this.server}/user/wallet/${id}`)
  }
  
  isWorkerBooked(userId: string, workerId: string){
    return this.http.get(`${this.server}/user/isBooked/${userId}/${workerId}`)
  }
  
  loadChats(senderId: string, receiverId: string){
    return this.http.get(`${this.server}/chat/load-chats/${senderId}/${receiverId}`);
  }
  
  sendChat(data:{senderId: string, receiverId: string, content: string }){
    this.socket.emit('chat message', data)
    return this.http.put(`${this.server}/chat/send-chat/`,{data});
  }

  onNewMessage() {
    return new Observable<string>((observer) => {
      this.socket.on('chat message', (message: any) => {
        observer.next(message);
      });
    });
  }

  addWorkerComplaint(complaint: Complaint){
    return this.http.post(`${this.server}/user/add-complaint`,complaint)
  }

}