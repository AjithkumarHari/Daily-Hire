import { Component } from '@angular/core';
import { Review } from 'src/app/types/Review';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-review-management',
  templateUrl: './review-management.component.html',
  styleUrls: ['./review-management.component.css']
})
export class ReviewManagementComponent {

  reviews$: Review[] = [];
  currentPage: number = 1;
  pages: number[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllReviews().subscribe((data: Review[]) => {
      this.reviews$ = data;
      this.countPages(this.reviews$.length);
    });
  }

  onStatusChange(reviewId: any) {
    this.adminService
      .changeReviewStatus(reviewId)
      .subscribe(() => {
        this.adminService.getAllReviews().subscribe((data: Review[]) => {
          this.reviews$ = data;
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
