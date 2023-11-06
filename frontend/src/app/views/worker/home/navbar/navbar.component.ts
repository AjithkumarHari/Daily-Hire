import { Component } from '@angular/core';
import { WorkerService } from '../../worker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private workerService: WorkerService, private router: Router
  ){}
  logout(){
    this.workerService.deleteToken();
    this.router.navigateByUrl('worker/auth/login')
  }
}
