import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Worker } from '../../../../types/Worker';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from 'src/app/types/Review';

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.css']
})
export class WorkerDetailsComponent implements OnInit{
  id: string | null = '';
  details$!: Worker;
  showDateAddReview: boolean = false;
  ratingDisplay: number = 0;
  reviewForm!: FormGroup;
  bookingDate!: Date;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private formBuilder : FormBuilder){}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    
    if(this.id){
      this.userService.getWorkerById(this.id).subscribe((data: Worker)=>{
        this.details$ = data          
      })
    }

    this.reviewForm = this.formBuilder.group({
      title : new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z]{3,15}$")]),
      review : new FormControl(null, [Validators.required, Validators.max(100)])
    })

  }

  onRatingSet(rating: number): void {
    this.ratingDisplay = rating;
  }

  onReviewSubmit(){
    const review: Review = {
      rating: this.ratingDisplay,
      reviewTitle: this.reviewForm.value.title,
      reviewDescription: this.reviewForm.value.review
    }
    console.log(review);
    this.ratingDisplay = 0;
    this.reviewForm.reset();
  }

  onBooking(date: Date){
    this.bookingDate = date;
    console.log(this.bookingDate.toDateString());
  }
   
}
