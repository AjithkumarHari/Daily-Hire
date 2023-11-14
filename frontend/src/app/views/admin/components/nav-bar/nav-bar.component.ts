import { Component } from '@angular/core';
import { AdminAuthService } from '../../services/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private adminService: AdminAuthService, private router: Router){}

  logout(){
    this.adminService.deleteToken();
    this.router.navigateByUrl('admin/auth')
  }
}
