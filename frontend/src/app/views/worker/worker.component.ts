import { Component } from '@angular/core';
import { WorkerState } from './state/worker.state';
import { Store } from '@ngrx/store';
import { workerBrowserReload } from './state/login/worker.login.action';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent {

  constructor(private store: Store<WorkerState>){}  
  
  ngOnInit(){
    let workerData = window.localStorage.getItem('worker-data') 
    const token = window.localStorage.getItem('worker-token') 
    console.log();
    
    if(workerData && token){
      workerData = JSON.parse(workerData);
      this.store.dispatch(workerBrowserReload({token,  workerData}))
    }
  }
}
