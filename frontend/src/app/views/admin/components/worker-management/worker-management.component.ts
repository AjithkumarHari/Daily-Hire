import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Worker } from '../../../../types/Worker';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-worker-management',
  templateUrl: './worker-management.component.html',
  styleUrls: ['./worker-management.component.css']
})
export class WorkerManagementComponent {

  workers$ : Worker[] = [];
  currentPage: number = 1;
  pages: number[] = [];
  workerSub: any;
  workerStatusSub: any;

  constructor( private adminService: AdminService){}

  ngOnInit(){
    this.workerSub = this.adminService.getAllWorkers().pipe(take(1)).subscribe((data)=>{ 
      this.workers$ = data;
      this.countPages(this.workers$.length);
    });
  }

  onStatusChange(workerId: any){
    this.workerStatusSub = this.adminService.changeWorkerStatus(workerId).pipe(take(1)).subscribe((data: any)=> {
      this.ngOnInit();
    })
  }

  countPages(total: number){    
    this.pages = []; 
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

  // ngOnDestroy(){
  //   this.workerSub.unsubscribe()
  //   this.workerStatusSub.unsubscribe()
  // }
}
