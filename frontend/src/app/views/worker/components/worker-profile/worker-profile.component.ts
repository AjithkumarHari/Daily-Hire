import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectWorkerDetails } from '../../state/login/worker.login.selector';
import { WorkerState } from '../../state/worker.state';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css']
})
export class WorkerProfileComponent {

  workerDetails: any;

  constructor(private store: Store<WorkerState>) {
    
  }

  ngOnInit(){
 
    this.store.pipe(select(selectWorkerDetails)).subscribe((workerData)=>{
      console.log(workerData);
      
      this.workerDetails = workerData;
      
    })
  }
}
