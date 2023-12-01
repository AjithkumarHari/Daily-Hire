import { Component } from '@angular/core';
import { Booking } from 'src/app/types/Booking';
import { User } from 'src/app/types/User';
import { UserService } from '../../../services/user.service';
import { Store, select } from '@ngrx/store';
import { UserState } from '../../../state/user.state';
import { selectUserData } from '../../../state/login/login.selector';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent {

  user!: User;
  bookings$: Booking[] = [];
  
  currentPage: number = 1;
  pages: number[] = [];


  constructor(private userService: UserService, private store: Store<UserState>){}

  ngOnInit(){
    this.store.pipe(select(selectUserData)).subscribe((data) => {
      this.user = data;
      this.userService.getBookingByUser(this.user.email).subscribe((data)=>{
        this.bookings$ = data.filter((details)=>{
          const newDate = new Date(details.bookingTime); 
          const currentDate = new Date(); 
          newDate.setHours(0, 0, 0, 0);
          currentDate.setHours(0, 0, 0, 0);
          return newDate < currentDate;
        });
        this.countPages(this.bookings$.length);
      });
    });
  }

  countPages(total: number){    
    for(let i=1;i<=Math.ceil(total/4);i++){
      this.pages.push(i)
    }
  }

  onPrevious($event: Event) {
    $event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onNext($event: Event) {
    $event.preventDefault();
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
    }
  }

  onPageClick(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
