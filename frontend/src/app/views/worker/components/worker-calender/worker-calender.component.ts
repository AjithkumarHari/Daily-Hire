import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from 'src/app/types/Booking';
import { WorkerService } from '../../services/worker.service';

@Component({
  selector: 'app-worker-calender',
  templateUrl: './worker-calender.component.html',
  styleUrls: ['./worker-calender.component.css']
})
export class WorkerCalenderComponent {
  MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  month!: number; 
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];
  selectedDate!: Date;

  @Input() bookings!: Booking[];
  @Input() blockedDates: Date[] | undefined;
  @Output() onBlockBooking : EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onShowBooking : EventEmitter<Date> = new EventEmitter<Date>();

  constructor(private workerService: WorkerService){}
  
  ngOnInit(): void {
 
    this.initDate();
    this.getNoOfDays();
  }

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.selectedDate = new Date(this.year, this.month, today.getDate())
  }

  isToday(date: any) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString() ? true : false;
  }
  
  isPast(date: any) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const d = new Date(this.year, this.month, date);
    d.setHours(0, 0, 0, 0);
    return currentDate.getTime() > d.getTime(); 
  }

  isBooked(date: any) {
    const d = new Date(this.year, this.month, date);
    d.setHours(0, 0, 0, 0);
    const result = this.bookings.some((details) => {
      const newDate = new Date(details.bookingTime);
      newDate.setHours(0, 0, 0, 0);
      return newDate.getTime() === d.getTime();
    });
    return result;
  }
  
  isBlocked(date: any) {
    if(this.blockedDates){
      const d = new Date(this.year, this.month, date);
      d.setHours(0, 0, 0, 0);
      const result = this.blockedDates.some((details) => {
        const newDate = new Date(details);
        newDate.setHours(0, 0, 0, 0);
        return newDate.getTime() === d.getTime();
      });
      return result;
    }
    return null;
  }


  getDateValue(date: any): void {
    this.selectedDate = new Date(this.year, this.month, date);
    this.isBooked(date) ? this.onShowBooking.emit(this.selectedDate) : this.onBlockBooking.emit(this.selectedDate);
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }

  trackByIdentity = (index: number, item: any) => item; 

}
