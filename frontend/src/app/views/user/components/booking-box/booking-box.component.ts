import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from 'src/app/types/Booking';

@Component({
  selector: 'app-booking-box',
  templateUrl: './booking-box.component.html',
  styleUrls: ['./booking-box.component.css']
})
export class BookingBoxComponent<B> {

  @Input() bookingData?: Booking[];
  @Output() onCancel: EventEmitter<string> = new EventEmitter<string>();

}
