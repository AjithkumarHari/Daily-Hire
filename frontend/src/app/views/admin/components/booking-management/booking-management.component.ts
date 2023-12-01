import { Component } from '@angular/core';
import { Booking } from 'src/app/types/Booking';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent {

  bookings$: Booking[] = [];
  currentPage: number = 1;
  pages: number[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllBookings().subscribe((data: Booking[]) => {
      this.bookings$ = data;
      this.countPages(this.bookings$.length);
    });
  }

  onStatusChange(bookingId: any) {  
    this.adminService
      .changeBookingStatus(bookingId)
      .subscribe(() => {
        this.adminService.getAllBookings().subscribe((data: Booking[]) => {
          this.bookings$ = data
        });
      });
  }

  

  countPages(total: number){    
    for(let i=1;i<=Math.ceil(total/6);i++){
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
