import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Worker } from '../../worker/types/Worker';

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.css']
})
export class WorkerDetailsComponent implements OnInit{
  id: string | null = '';
  details$!: Worker;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService){}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    
    if(this.id){
      this.userService.getWorkerById(this.id).subscribe((data: Worker)=>{
        this.details$ = data          
      })
    }
    
  }
}
