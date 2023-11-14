import { Component } from '@angular/core';
import { User } from '../../../../types/User';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  users$: User[] = [];
  constructor( private adminService: AdminService){}

  ngOnInit(){
    this.adminService.getAllUsers().subscribe((data)=> this.users$ = data);
  }

  

  onStatusChange(userId: any){
    this.adminService.changeUserStatus(userId).subscribe((data: any)=> {console.log(data)
      this.adminService.getAllUsers().subscribe((data)=> this.users$ = data);
    }
    )
  }
}
