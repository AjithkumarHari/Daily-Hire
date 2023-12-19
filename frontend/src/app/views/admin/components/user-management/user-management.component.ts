import { Component } from '@angular/core';
import { User } from '../../../../types/User';
import { AdminService } from '../../services/admin.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  users$!: User[];
  currentPage: number = 1;
  pages: number[] = [];
  userSub: any;
  userStatusSub: any;

  constructor( private adminService: AdminService){}

  ngOnInit(){
    this.userSub = this.adminService.getAllUsers().pipe(take(1)).subscribe((data)=>{ 
      this.users$ = data
      this.countPages(this.users$.length)
    });
  }

  onStatusChange(userId: any){
    this.userStatusSub = this.adminService.changeUserStatus(userId).pipe(take(1)).subscribe(()=> { 
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

  getUser(){
    return this.users$
  }
}
