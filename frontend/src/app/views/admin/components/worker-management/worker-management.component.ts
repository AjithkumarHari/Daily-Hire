import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Worker } from '../../../../types/Worker';
import { take } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/types/Service';

@Component({
  selector: 'app-worker-management',
  templateUrl: './worker-management.component.html',
  styleUrls: ['./worker-management.component.css']
})
export class WorkerManagementComponent {

  workers$ : Worker[] = [];
  allWorkers$ : Worker[] = [];
  currentPage: number = 1;
  pages: number[] = [];
  workerSub: any;
  workerStatusSub: any;
  form!: FormGroup;
  services: Service[] = [];

  constructor( private adminService: AdminService,  private formBuilder : FormBuilder,){}

  ngOnInit(){
    this.workerSub = this.adminService.getAllWorkers().pipe(take(1)).subscribe((data)=>{ 
      this.allWorkers$ = data;
      this.workers$ = this.allWorkers$;
      this.countPages(this.workers$.length);
    });
    this.adminService.getAllServices().pipe(take(1)).subscribe((data)=> this.services = data)

    this.form = this.formBuilder.group({
      searchKey : new FormControl(null, [Validators.required]),
      serviceKey : new FormControl('All', [Validators.required]),
      genderKey : new FormControl('All', [Validators.required]),
      wageKey : new FormControl('All', [Validators.required]),
      statusKey : new FormControl('All', [Validators.required]),
    })
  }

  onApplyAllFilter(){
 
    if(this.form.value.searchKey !== null){
      this.workers$ =  this.allWorkers$.filter(worker => {
        const lowercaseText =  this.form.value.searchKey.toLowerCase();
        const lowercaseWorkerName = worker.name.toLowerCase();
        return lowercaseWorkerName.includes(lowercaseText);
      });
    }

    if(this.form.value.serviceKey != 'All' ){
      if(this.form.value.searchKey !== null  ) { 
          console.log('filtered bookingss');
          this.workers$ = this.workers$.filter(worker => worker.work == this.form.value.serviceKey);
        }
      else{
        console.log('all bookings');
        this.workers$ = this.allWorkers$.filter(worker => worker.work == this.form.value.serviceKey);
      }
    }
    
    if(this.form.value.genderKey != 'All'){
      if(this.form.value.searchKey !== null ||this.form.value.serviceKey != 'All'  ) { 
          console.log('filtered bookingss');
          this.workers$ = this.workers$.filter(worker => worker.gender == this.form.value.genderKey);
        }
      else{
        console.log('all bookings');
        this.workers$ = this.allWorkers$.filter(worker => worker.gender == this.form.value.genderKey);
      }
    }

    if(this.form.value.statusKey != 'All'){
      if(this.form.value.serviceKey != 'All'  ){
        console.log('filtered bookingss');
        
        if(this.form.value.statusKey=='listed'){
          this.workers$ = this.workers$.filter(worker => worker.isListed == true);
        }else{
          this.workers$ = this.workers$.filter(worker => worker.isListed == false);
        }
        }
      else {
       console.log('all bookings');
        if(this.form.value.statusKey=='listed'){
          this.workers$ = this.allWorkers$.filter(worker => worker.isListed == true);
        }else{
          this.workers$ = this.allWorkers$.filter(worker => worker.isListed == false);
        }
      }  
    }

    if(this.form.value.wageKey != 'All'){
      if(this.form.value.searchKey !== null || this.form.value.serviceKey != 'All' || this.form.value.wageKey != 'All' ) { 

         
          if (this.form.value.wageKey === 'asce') {
            this.workers$ = this.workers$.slice().sort((a, b) => a.wageForDay - b.wageForDay);
          } else {
            this.workers$ = this.workers$.slice().sort((a, b) => b.wageForDay - a.wageForDay);
          }
        }
      else{
        console.log('all bookings');
        if (this.form.value.wageKey === 'asce') {
          this.workers$ = this.allWorkers$.slice().sort((a, b) => a.wageForDay - b.wageForDay);
        } else {
          this.workers$ = this.allWorkers$.slice().sort((a, b) => b.wageForDay - a.wageForDay);
        }
      }
    }
    
  }

  onFilterReset(){
    this.workers$ = this.allWorkers$;
    this.form.reset({
      serviceKey : 'All',
      genderKey : 'All',
      wageKey:'All',
      statusKey: 'All'
    })
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

}
