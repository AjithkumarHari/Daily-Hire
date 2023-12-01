import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from 'src/app/types/Booking';

@Component({
  selector: 'app-selected-day',
  templateUrl: './selected-day.component.html',
  styleUrls: ['./selected-day.component.css']
})
export class SelectedDayComponent {
  @Input() booking!: Booking;

  @Output() onCancel : EventEmitter<string> = new EventEmitter<string>();

  onCancelSelected(){
    console.log(this.booking.bookingTime);
    if(this.booking._id){
      this.onCancel.emit(this.booking._id)
    }
  }

}
