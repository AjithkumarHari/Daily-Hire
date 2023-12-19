import { Component } from '@angular/core';
import { Service } from 'src/app/types/Service';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent {

  services$: Service[] = [];

  constructor(private userService: UserService){}

  ngOnInit(){
    this.userService.allServices().pipe(take(1)).subscribe((data)=> this.services$ = data);
  }
  
}
