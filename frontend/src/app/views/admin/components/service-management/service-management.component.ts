import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Service } from 'src/app/types/Service';
import { AdminService } from '../../services/admin.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent {

  services$: Service[] = [];
  allServices$: Service[] = [];
  currentPage: number = 1;
  pages: number[] = [];
  form!: FormGroup;

  constructor(private adminService: AdminService, private formBuilder : FormBuilder,) {}

  ngOnInit() {
    this.adminService.getAllServices().pipe(take(1)).subscribe((data: Service[]) => {
      this.allServices$ = data;
      this.services$ = this.allServices$;
      this.countPages(this.services$.length);
    });
    this.form = this.formBuilder.group({
      searchKey : new FormControl(null, [Validators.required]),
      statusKey : new FormControl('All', [Validators.required]),
    })
  }

  onApplySearchFilter(){
    this.services$ =  this.allServices$.filter(service => {
      const lowercaseText =  this.form.value.searchKey.toLowerCase();
      const lowercaseName = service.name.toLowerCase();
      return lowercaseName.includes(lowercaseText);
    });
    this.countPages(this.services$.length);
  }

  onApplyStatusFilter(){
    const statusKey = this.form.value.statusKey;
    if (statusKey === 'All') {
       this.services$ = this.allServices$
    } else if (statusKey === 'hidden') {
      if(this.form.value.searchKey == null)
        this.services$ = this.allServices$.filter(service => service.isListed === true);
      else
        this.services$ = this.services$.filter(service => service.isListed === true);
      
    }  else if (statusKey === 'unHidden') {
      if(this.form.value.searchKey == null)
        this.services$ = this.allServices$.filter(service => service.isListed === false);
      else
        this.services$ = this.services$.filter(service => service.isListed === false);
    }  
  }

  onStatusChange(serviceId: any) {
    this.adminService
      .changeServiceStatus(serviceId)
      .pipe(take(1)).subscribe(() => {
         this.ngOnInit();
      });
  }

  countPages(total: number){
    this.pages = [];
    for(let i=1;i<=Math.ceil(total/6);i++){
      this.pages.push(i)
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