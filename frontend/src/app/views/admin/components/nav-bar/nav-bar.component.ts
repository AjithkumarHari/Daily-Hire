import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private adminService: AdminService, private router: Router){}

  logout(){
    this.adminService.deleteToken();
    this.router.navigateByUrl('admin/auth')
  }
}
