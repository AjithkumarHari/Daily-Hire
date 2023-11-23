import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Worker } from 'src/app/types/Worker';

@Component({
  selector: 'app-booking-form-box',
  templateUrl: './booking-form-box.component.html',
  styleUrls: ['./booking-form-box.component.css']
})
export class BookingFormBoxComponent {

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
  showDatepicker = false;
  datepickerValue!: string;
  month!: number; // !: mean promis it will not be null, and it will definitely be assigned
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];
  selectedDate!: Date;
  

  @Input() worker!: Worker ;

  @Output() scheduledDateTime: EventEmitter<Date> = new EventEmitter<Date>();

  constructor( ) {}

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
    
  }

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.selectedDate = new Date(this.year, this.month, today.getDate())
    this.datepickerValue = this.selectedDate.toDateString(); 
  }

  isToday(date: any) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString() ? true : false;
  }

  getDateValue(date: any) {
    this.selectedDate = new Date(this.year, this.month, date);
    this.datepickerValue = this.selectedDate.toDateString();
    this.showDatepicker = false;
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    // find where to start calendar day of week
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

  onSubmit(){
    console.log(this.selectedDate);
    this.scheduledDateTime.emit(this.selectedDate);
  }
}
