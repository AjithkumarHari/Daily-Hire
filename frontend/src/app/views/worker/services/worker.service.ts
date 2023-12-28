import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';  
import { Worker } from '../../../types/Worker';
import { Service } from 'src/app/types/Service';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/types/Booking';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  site = environment.siteUrl;
  server = environment.serverUrl;
  private socket: any;

  constructor( private http: HttpClient) {
    this.socket = io(this.site)
   }

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

  unBlockBooking(workerId: string, blockDate: Date){
    return this.http.put(`${this.server}/worker/unblock-booking`,{workerId, blockDate })
  }

  getWorkerStats(id: string) {
    return this.http.get(`${this.server}/worker/worker-stats/${id}`)
  }

  loadChatMates(id: string){
    return this.http.get(`${this.server}/chat/load-chatmates/${id}`)
  }

  sendChat(data:{senderId: string, receiverId: string, content: string }){
    this.socket.emit('chat message', data)
    return this.http.put(`${this.server}/chat/send-chat/`,{data});
  }

  loadChats(senderId: string, receiverId: string){
    return this.http.get(`${this.server}/chat/load-chats/${senderId}/${receiverId}`);
  }

  onNewMessage() {
    return new Observable<string>((observer) => {
      this.socket.on('chat message', (message: any) => {
        observer.next(message);
      });
    });
  }

  updateProfile(workerId: string, worker: Worker){
    return this.http.put(`${this.server}/worker/edit-worker`,{workerId, worker} )
  }

}
