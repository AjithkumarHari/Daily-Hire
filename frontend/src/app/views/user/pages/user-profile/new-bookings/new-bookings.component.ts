import { Component } from '@angular/core';
import { Booking } from 'src/app/types/Booking';
import { UserService } from '../../../services/user.service';
import { User } from 'src/app/types/User';
import { UserState } from '../../../state/user.state';
import { Store, select } from '@ngrx/store';
import { selectUserData } from '../../../state/login/login.selector';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new-bookings',
  templateUrl: './new-bookings.component.html',
  styleUrls: ['./new-bookings.component.css']
})
export class NewBookingsComponent {

  user!: User;
  bookings$: Booking[] = [];
  date: Date = new Date();
  currentPage: number = 1;
  pages: number[] = [];

  constructor(private userService: UserService, private store: Store<UserState>){}

  ngOnInit(){
    this.store.pipe(select(selectUserData)).pipe(take(1)).subscribe((data) => {
      this.user = data;
      if(this.user._id){
        this.userService.getBookingByUser(this.user._id).subscribe((data)=>{
          this.bookings$ = data.filter((details)=>{
            const newDate = new Date(details.bookingTime); 
            const currentDate = new Date(); 
            newDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);
            return newDate >= currentDate;
          });
          this.countPages(this.bookings$.length); 
        });
      }
    });
  }

  countPages(total: number){
    this.pages = [];
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

  onCancelRequest(bookingId: any){
    this.userService.bookingCancelRequest(bookingId).pipe(take(1)).subscribe();
    this.ngOnInit();
  }
}
