import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Complaint } from 'src/app/types/Complaint';
import { take } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-complaint-management',
  templateUrl: './complaint-management.component.html',
  styleUrls: ['./complaint-management.component.css']
})
export class ComplaintManagementComponent {

  complaints$: Complaint[] = [];
  allComplaints$: Complaint[] = [];
  currentPage: number = 1;
  pages: number[] = [];
  form!: FormGroup;

  constructor(private adminService: AdminService, private formBuilder : FormBuilder,) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      searchKey : new FormControl(null, [Validators.required]),
    })
    this.adminService.getAllComplaints().pipe(take(1)).subscribe((data)=> {
      this.allComplaints$ = data.reverse(); 
      this.complaints$ = this.allComplaints$;
    });
    
  }

  onApplySearchFilter(){
    this. complaints$ =  this.allComplaints$.filter(complaint => {
      const lowercaseText =  this.form.value.searchKey.toLowerCase();
      const lowercaseUserName = complaint.userName.toLowerCase();
      const lowercaseWorkerName = complaint.workerName.toLowerCase();
      return lowercaseUserName.includes(lowercaseText) || lowercaseWorkerName.includes(lowercaseText);
    });
    this.countPages(this.complaints$.length);
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
