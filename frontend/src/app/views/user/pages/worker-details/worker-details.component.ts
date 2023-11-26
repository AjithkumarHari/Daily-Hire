import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Worker } from '../../../../types/Worker';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from 'src/app/types/Review';
import { selectUserData } from '../../state/login/login.selector';
import { UserState } from '../../state/user.state';
import { Store, select } from '@ngrx/store';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.css']
})
export class WorkerDetailsComponent implements OnInit{
  id: string | null = '';
  details$!: Worker;
  user!: User;
  reviews$: Review[] = [];
  showDateAddReview: boolean = false;
  ratingDisplay: number = 0;
  reviewForm!: FormGroup;
  bookingDate!: Date;
  currentPage: number = 1;
  pages: number[] = [];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private userService: UserService, 
    private formBuilder : FormBuilder,
    private store: Store<UserState>
  ){}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    
    if(this.id){
      this.userService.getWorkerById(this.id).subscribe((data: Worker)=> this.details$ = data);
      this.userService.getReviewByWorker(this.id).subscribe((data: Review[])=> {
        this.reviews$ = data;
        this.countPages(this.reviews$.length);
      });       
    }
 
    this.store.pipe(select(selectUserData)).subscribe((data) => {
      this.user = data;
    });

    this.reviewForm = this.formBuilder.group({
      title : new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z]{3,15}$")]),
      review : new FormControl(null, [Validators.required, Validators.max(100)])
    })
    
  }

  onRatingSet(rating: number): void {
    this.ratingDisplay = rating;
  }

  starCount(count: number): number[] {
    const numbers = [];
    for (let i = 0; i < count; i++) {
      numbers.push(i + 1);
    }
    return numbers;
  }

  onReviewSubmit(){
 
    if(this.user?._id && this.details$?._id){
      const review: Review = {
        rating: this.ratingDisplay,
        reviewTitle: this.reviewForm.value.title,
        reviewDescription: this.reviewForm.value.review,
        userName: this.user.name,
        userEmail: this.user.email,
        workerName: this.details$.name,
        workerId: this.details$._id
      }
      this.userService.addWorkerReview(review).subscribe((data)=>{
        this.ratingDisplay = 0;
        this.reviewForm.reset();
        if(this.id){
          this.userService.getReviewByWorker(this.id).subscribe((data: Review[])=> this.reviews$ = data);       
        }
      })
    }else{
      console.error('userId or workerId not found');
    }

  }

  countPages(total: number){    
    for(let i=1;i<=Math.ceil(total/2);i++){
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
