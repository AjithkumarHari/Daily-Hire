import { Component } from '@angular/core';
import { User } from '../../../../types/User';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  users$!: User[];
  currentPage: number = 1;
  pages: number[] = [];

  constructor( private adminService: AdminService){}

  ngOnInit(){
    this.adminService.getAllUsers().subscribe((data)=>{ 
      this.users$ = data
      this.countPages(this.users$.length)
    });
  }

  

  onStatusChange(userId: any){
    this.adminService.changeUserStatus(userId).subscribe((data: any)=> {console.log(data)
      this.adminService.getAllUsers().subscribe((data)=> this.users$ = data);
    }
    )
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

  getUser(){
    console.log(this.users$);
    
    return this.users$
  }
}
