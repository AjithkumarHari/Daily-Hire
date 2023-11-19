import { Component } from '@angular/core';
import { Service } from 'src/app/types/Service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent {

  services$: Service[] = [];

  constructor(private userService: UserService){}

  ngOnInit(){
    this.userService.allServices().subscribe((data)=>{
      this.services$ = data;
    })
  }
 
 
  
}
