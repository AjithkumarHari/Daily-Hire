import { Component, Input } from '@angular/core';
import { Booking } from 'src/app/types/Booking';

@Component({
  selector: 'app-worker-appoinments',
  templateUrl: './worker-appoinments.component.html',
  styleUrls: ['./worker-appoinments.component.css']
})
export class WorkerAppoinmentsComponent {

  @Input() bookings!: Booking[];

}
