import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Worker } from '../../../../types/Worker';

@Component({
  selector: 'app-worker-management',
  templateUrl: './worker-management.component.html',
  styleUrls: ['./worker-management.component.css']
})
export class WorkerManagementComponent {

  workers$ : Worker[] = [];
  currentPage: number = 1;
  pages: number[] = [];

  constructor( private adminService: AdminService){}

  ngOnInit(){
    this.adminService.getAllWorkers().subscribe((data)=>{ 
      this.workers$ = data;
      this.countPages(this.workers$.length);
    });
    
  }

  onStatusChange(workerId: any){
    this.adminService.changeWorkerStatus(workerId).subscribe((data: any)=> {console.log(data);
      this.adminService.getAllWorkers().subscribe((data)=> this.workers$ = data);
    }
    )
  }

  countPages(total: number){    
    for(let i=1;i<=Math.ceil(total/6);i++){
      this.pages.push(i);
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
