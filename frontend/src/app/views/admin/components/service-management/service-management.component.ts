import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Service } from 'src/app/types/Service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export
 
class
 
ServiceManagementComponent {

  services$: Service[] = [];
  currentPage: number = 1;
  pages: number[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllServices().subscribe((data: Service[]) => {
      this.services$ = data;
      this.countPages(this.services$.length);
    });
  }

  onStatusChange(serviceId: any) {
    this.adminService
      .changeServiceStatus(serviceId)
      .subscribe((data: any) => {
        console.log(data);
        this.adminService.getAllServices().subscribe((data: Service[]) => {
          this.services$ = data;
        });
      });
  }

  countPages(total: number){    
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