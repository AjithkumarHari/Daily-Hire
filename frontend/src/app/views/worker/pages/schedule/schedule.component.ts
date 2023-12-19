import { Component } from '@angular/core';
import { Booking } from 'src/app/types/Booking';
import { WorkerState } from '../../state/worker.state';
import { Store, select } from '@ngrx/store';
import { WorkerService } from '../../services/worker.service';
import { selectWorkerDetails } from '../../state/login/worker.login.selector';
import { Worker } from 'src/app/types/Worker';
import { workerBlockBooking, workerUnBlockBooking } from '../../state/login/worker.login.action';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  
  bookings$: Booking[] = [];
  worker!: Worker;
  selectedShowDay!: Booking;
  selectedBlockDay!: Date;
  showDay: boolean = true;
  blockDay: boolean = true;
  unBlockDay: boolean = true;
  workerId: string = '';

  constructor(private store: Store<WorkerState>, private workerService: WorkerService){}

  ngOnInit(){
    this.store.pipe(select(selectWorkerDetails)).pipe(take(1)).subscribe((data) => {
      this.worker = data;
      this.workerId= data._id;
      if(this.worker._id)
        this.workerService.getAllBooking(this.worker._id).pipe(take(1)).subscribe((data)=>{ 
          this.bookings$ = data;
      })
    });
  }

  newBookings(){
    return this.bookings$.filter((details)=>{
      const newDate = new Date(details.bookingTime); 
      const currentDate = new Date(); 
      newDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      return newDate >= currentDate;
    });
  }

  workerBlockedDates(){
    return this.worker.blockedDates;
  }

  oldBooking(){
    return this.bookings$.filter((details)=>{
      const newDate = new Date(details.bookingTime); 
      const currentDate = new Date(); 
      newDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      return newDate >= currentDate;
    });
  }

  blockBooking(date: Date){
    if(this.worker.blockedDates){
      const isBookingBlocked =  this.worker.blockedDates.some((details) => {
        const newDate = new Date(details);
        newDate.setHours(0, 0, 0, 0);
        return newDate.getTime() === date.getTime();
      });
      if(isBookingBlocked){
        this.unBlockDay = false;
        this.blockDay = true;
        this.showDay = true;
      }else{
        this.blockDay = false;
        this.showDay = true;
        this.unBlockDay = true;
      }
      this.selectedBlockDay = date;
    }
  }
  showBooking(date: Date){
    const data = this.bookings$.filter((details) => {
      const bookingDate = new Date(details.bookingTime);
      return bookingDate.toDateString() === date.toDateString();
    });
    this.selectedShowDay = data[0];
    this.showDay = false;
    this.blockDay = true;
    this.unBlockDay = true;
  }

  onCancelled(bookingId: string){
    this.workerService.bookingCancel(bookingId).pipe(take(1)).subscribe((data)=>{
      if(this.worker._id){
        this.workerService.getAllBooking(this.worker._id).pipe(take(1)).subscribe((data)=>{ 
          this.bookings$ = data;
          this.showDay  = true;
          this.blockDay = true;
          this.unBlockDay  = true;
        })
      }
    })
  }
  
  onBlocked(blockDate: Date){
    const workerId = this.workerId;
    this.store.dispatch(workerBlockBooking({workerId,blockDate}));
    this.showDay  = true;
    this.blockDay = true;
    this.unBlockDay  = true;
  }
  
  onUnBlocked(blockDate: Date){
    const workerId = this.workerId;
    this.store.dispatch(workerUnBlockBooking({workerId,blockDate}));
    this.showDay  = true;
    this.blockDay = true;
    this.unBlockDay  = true;
  }

  nearestBooking(){
    const bookings = this.newBookings().sort((a, b) => {
      const dateA: any = new Date(a.bookingTime);
      const dateB: any = new Date(b.bookingTime);
      return dateA - dateB;  
    });
    return bookings;
  }
}
