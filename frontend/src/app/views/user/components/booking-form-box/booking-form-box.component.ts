import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { User } from 'src/app/types/User';
import { Worker } from 'src/app/types/Worker';
import { selectUserData } from '../../state/login/login.selector';
import { UserState } from '../../state/user.state';
import { UserService } from '../../services/user.service';
import { Booking } from 'src/app/types/Booking';
import { Wallet } from 'src/app/types/Wallet';
import { take } from 'rxjs/operators';


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
  selectedDate: Date = new Date();
  
  user!: User;
  @Input() worker!: Worker ;
  bookings!: Booking;
  wallet!: Wallet;
  workerBookings!: Booking[]
  paymentMethod: string ='stripe';
  success: boolean = false;

  constructor( 
    private userService: UserService, 
    private store: Store<UserState>,
  ) {}

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
    this.store.pipe(select(selectUserData)).pipe(take(1)).subscribe((data) => {
      this.user = data;
      if(this.user._id)
        this.userService.getWalletByUser(this.user._id).pipe(take(1)).subscribe((data)=>{
          this.wallet = data
        })
    });
    if(this.worker._id){
      this.userService.getBookingByWorker(this.worker._id).pipe(take(1)).subscribe((data)=> {
        this.workerBookings = data;
        this.selectedDate = this.getNextAvailableDate(this.selectedDate);
        this.datepickerValue = this.selectedDate.toDateString(); 
    
      })

    }
  }

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.selectedDate = new Date(this.year, this.month, today.getDate())
  }

  isBooked(date: Date) {
    if (this.workerBookings && this.workerBookings.length > 0) {
      const result = this.workerBookings.some((details) => {
        const newDate = new Date(details.bookingTime);
        newDate.setHours(0, 0, 0, 0);
        return newDate.getTime() === date.getTime();
      });
      return result;
    } else {
      return false;
    }
  }
  
  getNextAvailableDate(selectedDate: Date): Date {
    let nextDate = new Date(selectedDate); 
    while (this.isBooked(nextDate) || nextDate.getDay() === 0 || nextDate.getDay() === 6) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    return nextDate;
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

  changeMonth(monthOffset: number) {
    this.month += monthOffset;
    if (this.month === -1) {
        this.month = 11; 
        this.year--; 
    } else if (this.month === 12) {
        this.month = 0; 
        this.year++;
    }
    this.getNoOfDays();
  }

  onSubmit (){
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    this.selectedDate.setHours(0, 0, 0, 0);
    const paymentDetails = {
      user: this.user,
      worker: this.worker,
      bookingTime: this.selectedDate,
      paymentMethod: this.paymentMethod
    }

    this.userService.paymentRequest(paymentDetails).pipe(take(1)).subscribe(async (res: any)=>{
      if(res.sessionUrl){
        window.location.href = res.sessionUrl;
      }else{
        this.success = true
        setTimeout(()=>{
          window.location.reload();
        },2000)
      }
    })
  }
}