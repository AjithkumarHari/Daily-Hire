import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Worker } from 'src/app/types/Worker';
import { AdminService } from '../../services/admin.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.css']
})
export class WorkerDetailsComponent {

  workerId: any;
  worker!: Worker;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
  ){}
  
  ngOnInit(){
    this.workerId = this.activatedRoute.snapshot.paramMap.get('workerId');
    this.adminService.getWorkerById(this.workerId).pipe(take(1)).subscribe((data)=> this.worker = data
    );
  }

  onStatusChange(workerId: any){
    this.adminService.changeWorkerStatus(workerId).pipe(take(1)).subscribe(()=> this.ngOnInit() );
  }
}
