import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Booking } from 'src/app/types/Booking';
import { Worker } from 'src/app/types/Worker';
import { WorkerState } from '../../state/worker.state';
import { WorkerService } from '../../services/worker.service';
import { selectWorkerDetails } from '../../state/login/worker.login.selector';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  tab: string = 'new';

  bookings$: Booking[] = [];
  worker!: Worker;
  workerId : string =''

  constructor(private store: Store<WorkerState>, private workerService: WorkerService){}

  ngOnInit(){
    this.store.pipe(select(selectWorkerDetails)).subscribe((data) => {
      this.worker = data;
      this.workerId= data._id;
      this.workerService.getAllBooking(this.workerId).subscribe((data)=> this.bookings$ = data);
    });
  }


  setTab(tab: string){
    this.tab = tab;
  }

  onOldBookings(){
    return this.bookings$.filter((details)=>{
      const newDate = new Date(details.bookingTime); 
      const currentDate = new Date(); 
      newDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      return newDate < currentDate;
    });
  }

  onNewBookings(){
    return this.bookings$.filter((details)=>{
      const newDate = new Date(details.bookingTime); 
      const currentDate = new Date(); 
      newDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      return newDate >= currentDate;
    });
  }
}
