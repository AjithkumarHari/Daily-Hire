import { Component } from '@angular/core';
import { Review } from 'src/app/types/Review';
import { AdminService } from '../../services/admin.service';
import { Complaint } from 'src/app/types/Complaint';

@Component({
  selector: 'app-complaint-management',
  templateUrl: './complaint-management.component.html',
  styleUrls: ['./complaint-management.component.css']
})
export class ComplaintManagementComponent {

  compalaints$: Complaint[] = [];
  currentPage: number = 1;
  pages: number[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllComplaints().subscribe((data)=> {
      this.compalaints$ = data;
      console.log(data)
    }
    )
    
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
