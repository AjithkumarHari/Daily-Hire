import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Worker } from '../../worker/types/Worker';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit{

  workers$!: Worker[];

  constructor(private userService: UserService){}

  ngOnInit(): void {
    
    this.userService.allWorkers().subscribe((data: Worker[])=>{
      this.workers$ = data;
    })
  }
  
}
