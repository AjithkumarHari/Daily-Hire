import { Component } from '@angular/core';
import { Booking } from 'src/app/types/Booking';
import { WorkerState } from '../../state/worker.state';
import { Store, select } from '@ngrx/store';
import { WorkerService } from '../../services/worker.service';
import { selectWorkerDetails } from '../../state/login/worker.login.selector';
import { Worker } from 'src/app/types/Worker';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  
  bookings$: Booking[] = [];
  worker!: Worker;
  selectedShowDay!: Booking
  selectedBlockDay!: Date;
  showDay: boolean = true
  blockDay: boolean = true
  workerId : string =''

  constructor(private store: Store<WorkerState>, private workerService: WorkerService){}

  ngOnInit(){
    this.store.pipe(select(selectWorkerDetails)).subscribe((data) => {
      this.worker = data;
      this.workerId= data._id;
      if(this.worker._id)
        this.workerService.getAllBooking(this.worker._id).subscribe((data)=>{ 
          this.bookings$ = data
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
    console.log("block", date.toDateString());
    this.selectedBlockDay = date
    this.blockDay = false
    this.showDay = true
  }
  showBooking(date: Date){
    console.log("show",date.toDateString());
    const data = this.bookings$.filter((details) => {
      const bookingDate = new Date(details.bookingTime);
      return bookingDate.toDateString() === date.toDateString();
    });

    console.log(data);
    
    this.selectedShowDay = data[0]  ;
    this.showDay = false
    this.blockDay = true
  }

  onCancelled(bookingId: string){
    this.workerService.bookingCancel(bookingId).subscribe((data)=>{
      console.log(data);
      if(this.worker._id)
        this.workerService.getAllBooking(this.worker._id).subscribe((data)=>{ 
          this.bookings$ = data
      })
    })
  }
  onBlocked(blockDate: Date){
    this.workerService.blockBooking(this.workerId,blockDate).subscribe((data)=>{
      console.log(data);
        this.workerService.getAllBooking(this.workerId).subscribe((data)=>{ 
          this.bookings$ = data
      })
    })
  }
}
