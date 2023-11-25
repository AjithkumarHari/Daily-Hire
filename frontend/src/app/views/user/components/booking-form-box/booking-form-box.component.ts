import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output , ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { User } from 'src/app/types/User';
import { Worker } from 'src/app/types/Worker';
import { selectUserData } from '../../state/login/login.selector';
import { UserState } from '../../state/user.state';
import { UserService } from '../../services/user.service';
import { loadStripe } from '@stripe/stripe-js';

 

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
  month!: number; 
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];
  selectedDate!: Date;
  
  user!: User;
  @Input() worker!: Worker ;

  constructor( private userService: UserService, private store: Store<UserState> ) {}

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
    this.store.pipe(select(selectUserData)).subscribe((data) => {
      this.user = data;
      console.log(this.user);
    });
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

  onSubmit (){
    const paymentDetails = {
      user: this.user,
      worker: this.worker,
      bookingTime: this.selectedDate
    }
    console.log(paymentDetails);
    
    this.userService.paymentRequest(paymentDetails).subscribe(async (res: any)=>{
      let stripe = await loadStripe('pk_test_51OFsOJSDlgqaDxgfrx83NzkCWIKqRIeVLjNNHxcU7NrXLEMrddNWCnHHhYmWGB1cGDsvFQvnRvFM80h9aAXLqZ1100AWYv1XL9');
      stripe?.redirectToCheckout({
        sessionId:res.id
      })
    })
  }
  
}
