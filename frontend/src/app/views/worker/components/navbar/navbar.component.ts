import { Component } from '@angular/core';
import { WorkerAuthService } from '../../services/worker-auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private workerAuthService: WorkerAuthService, private router: Router
  ){}
  logout(){
    this.workerAuthService.deleteToken();
    this.router.navigateByUrl('worker/auth/login')
  }
}
