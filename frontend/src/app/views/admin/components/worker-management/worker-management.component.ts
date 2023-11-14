import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Worker } from '../../../../types/Worker';

@Component({
  selector: 'app-worker-management',
  templateUrl: './worker-management.component.html',
  styleUrls: ['./worker-management.component.css']
})
export class WorkerManagementComponent {

  workers$ : Worker[] = []

  constructor( private adminService: AdminService){}

  ngOnInit(){
    this.adminService.getAllWorkers().subscribe((data)=> this.workers$ = data)
  }

  onStatusChange(workerId: any){
    this.adminService.changeWorkerStatus(workerId).subscribe((data: any)=> {console.log(data)
      this.adminService.getAllWorkers().subscribe((data)=> this.workers$ = data)
    }
    )
  }
}
