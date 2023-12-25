import { Component } from '@angular/core';
import { Review } from 'src/app/types/Review';
import { AdminService } from '../../services/admin.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-management',
  templateUrl: './review-management.component.html',
  styleUrls: ['./review-management.component.css']
})
export class ReviewManagementComponent {

  reviews$: Review[] = [];
  allReviews$: Review[] = [];
  currentPage: number = 1;
  pages: number[] = [];
  form!: FormGroup;

  constructor(private adminService: AdminService,
    private formBuilder : FormBuilder,
  ) {}

  ngOnInit() {
    this.adminService.getAllReviews().pipe(take(1)).subscribe((data: Review[]) => {
      this.allReviews$ = data.reverse();
      this.reviews$ = this.allReviews$;
      this.countPages(this.reviews$.length);
    });

    this.form = this.formBuilder.group({
      searchKey : new FormControl(null, [Validators.required]),
      ratingKey : new FormControl('All', [Validators.required]),
      statusKey : new FormControl('All', [Validators.required]),
    })
  }

  onApplySearchFilter(){
    this.reviews$ =  this.allReviews$.filter(review => {
      const lowercaseText =  this.form.value.searchKey.toLowerCase();
      const lowercaseUserName = review.userName.toLowerCase();
      const lowercaseWorkerName = review.workerName.toLowerCase();
      return lowercaseUserName.includes(lowercaseText) || lowercaseWorkerName.includes(lowercaseText);
    });
    this.countPages(this.reviews$.length);
  }

  onApplySortFilter(){
    const ratingKey = this.form.value.ratingKey;
    if (ratingKey === 'All') {
       this.reviews$ = this.allReviews$
    } else if (ratingKey === 'asce') {
      this.reviews$ = this.reviews$.slice().sort((a, b) => a.rating - b.rating);
    } else if (ratingKey === 'desc') {
      this.reviews$ = this.reviews$.slice().sort((a, b) => b.rating - a.rating);
    }  
  }
  
  onApplyStatusFilter(){
    const statusKey = this.form.value.statusKey;
    if (statusKey === 'All') {
       this.reviews$ = this.allReviews$
    } else if (statusKey === 'hidden') {
      if(this.form.value.searchKey == null)
        this.reviews$ = this.allReviews$.filter(review => review.isHidden === true);
      else
        this.reviews$ = this.reviews$.filter(review => review.isHidden === true);
      
    }  else if (statusKey === 'unHidden') {
      if(this.form.value.searchKey == null)
        this.reviews$ = this.allReviews$.filter(review => review.isHidden === false);
      else
        this.reviews$ = this.reviews$.filter(review => review.isHidden === false);
    }  
  }
  onStatusChange(reviewId: any) {
    this.adminService
      .changeReviewStatus(reviewId)
      .pipe(take(1)).subscribe(() => {
        this.ngOnInit()
      });
  }

  countPages(total: number){    
    this.pages = [];
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
