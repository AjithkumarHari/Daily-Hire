import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectWorkerDetails } from '../../state/login/worker.login.selector';
import { WorkerState } from '../../state/worker.state';
import { Worker } from 'src/app/types/Worker';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css']
})
export class WorkerProfileComponent {

  workerDetails!: Worker;

  constructor(private store: Store<WorkerState>) {}

  ngOnInit(){
    this.store.pipe(select(selectWorkerDetails))
      .pipe(take(1)).subscribe((workerData)=> this.workerDetails = workerData);
  }
}
