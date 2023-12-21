import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() onEdit: EventEmitter<string> = new EventEmitter<string>();

  constructor(private store: Store<WorkerState>) {}

  ngOnInit(){
    console.log('iniy');
    
    this.store.pipe(select(selectWorkerDetails))
      .pipe(take(1)).subscribe((workerData)=> this.workerDetails = workerData);
  }

  // ngDoCheck(){
  //   console.log('change');  
  //   this.ngOnInit()
    
  // }

  onEditClick(){
    this.onEdit.emit();
  }
}
