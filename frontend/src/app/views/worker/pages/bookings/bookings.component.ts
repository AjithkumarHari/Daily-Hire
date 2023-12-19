import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Booking } from 'src/app/types/Booking';
import { Worker } from 'src/app/types/Worker';
import { WorkerState } from '../../state/worker.state';
import { WorkerService } from '../../services/worker.service';
import { selectWorkerDetails } from '../../state/login/worker.login.selector';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  
  tab: string = 'new';
  bookings$: Booking[] = [];
  newBookings$: Booking[] = [];
  oldBookings$: Booking[] = [];
  worker!: Worker;
  workerId : string =''

  constructor(private store: Store<WorkerState>, private workerService: WorkerService){}

  ngOnInit(){
    this.store.pipe(select(selectWorkerDetails)).pipe(take(1)).subscribe((data) => {
      this.worker = data;
      this.workerId= data._id;
      this.workerService.getAllBooking(this.workerId).pipe(take(1)).subscribe((data)=>{ 
        this.bookings$ = data
        this.onNewBookings()
        this.onOldBookings()
      });
    });
  }

  setTab(tab: string){
    this.tab = tab;
  }

  onOldBookings(){
    this.oldBookings$ = this.bookings$.filter((details)=>{
      const newDate = new Date(details.bookingTime); 
      const currentDate = new Date(); 
      newDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      return newDate < currentDate;
    });
  }

  onNewBookings(){
    this.newBookings$ = this.bookings$.filter((details)=>{
      const newDate = new Date(details.bookingTime); 
      const currentDate = new Date(); 
      newDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      return newDate >= currentDate;
    });
  }

  onNewBookingSeachFilter(text: string){
    if(text ==''){
      this.onNewBookings()
    }else{
      this.newBookings$ = this.newBookings$.filter(booking => {
        const lowercaseText = text.toLowerCase();
        const lowercaseName = booking.user.name.toLowerCase();
        return lowercaseName.includes(lowercaseText);
      });
    }
    
  }
  
  onOldBookingSeachFilter(text: string){
    if(text ==''){
      this.onOldBookings()
    }else{
      this.oldBookings$ = this.oldBookings$.filter(booking => {
        const lowercaseText = text.toLowerCase();
        const lowercaseName = booking.user.name.toLowerCase();
        return lowercaseName.includes(lowercaseText);
      });
    }
  }

  onCancelled(bookingId: string){
    this.workerService.bookingCancel(bookingId).pipe(take(1)).subscribe((data)=>{
      if(this.worker._id)
        this.workerService.getAllBooking(this.worker._id).pipe(take(1)).subscribe((data)=>{ 
          this.bookings$ = data;
          this.onNewBookings();
          this.onOldBookings();
      })
    })
  }
 
}