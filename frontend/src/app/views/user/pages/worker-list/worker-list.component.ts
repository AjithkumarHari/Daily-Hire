import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Worker } from '../../../../types/Worker';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit{

  workers$: Worker[] = [];
  selectedGender: string = 'all';
  searchText: string = '';
  orderAge: string = '';
  orderWage: string = '';
  serviceFilter: string | null = null;

  constructor(private activatedRoute: ActivatedRoute,private userService: UserService){}

  ngOnInit(): void {
    this.userService.allWorkers().subscribe((data: Worker[])=>{
      this.workers$ = data;
      this.serviceFilter = this.activatedRoute.snapshot.paramMap.get('serviceName')
      if(this.serviceFilter){
        this.workers$ = this.workers$.filter(worker => worker.work == this.serviceFilter);
      }
    })
  }

  getAllWorkersCount(){ 
    return this.workers$.length;
  }
  getMaleWorkersCount(){
    return this.workers$.filter(worker => worker.gender == 'male').length;
  }
  getFemaleWorkersCount(){
    return this.workers$.filter(worker => worker.gender == 'female').length;  
  }

  onGenderFilterChanged(data: string){
    this.selectedGender = data;
  }
  onAgeSortChanged(data: string){
    this.orderAge = data;
  }
  onWageSortChanged(data: string){
    this.orderWage = data;
  }
  
  onSearchTextEntered(enteredText: string){
    this.searchText = enteredText;
  }

 
}
