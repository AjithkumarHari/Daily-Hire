import { Component, Input } from '@angular/core';
import { Booking } from 'src/app/types/Booking';

@Component({
  selector: 'app-current-booking-box',
  templateUrl: './current-booking-box.component.html',
  styleUrls: ['./current-booking-box.component.css']
})
export class CurrentBookingBoxComponent {

  @Input() bookings!: Booking[];

}
