import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Booking } from 'src/app/types/Booking';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {

  bookingId: any;
  booking!: Booking;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
  ){}
  
  ngOnInit(){
    this.bookingId = this.activatedRoute.snapshot.paramMap.get('bookingId');
    this.adminService.getBookingById(this.bookingId).pipe(take(1)).subscribe((data)=>this.booking = data);
  }

  onStatusChange(bookingId: any) {  
    this.adminService
      .changeBookingStatus(bookingId)
      .pipe(take(1)).subscribe(() => {
         this.ngOnInit()
      });
  }

}
