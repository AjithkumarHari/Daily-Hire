import { Component } from '@angular/core';
import { UserState } from './state/user.state';
import { Store } from '@ngrx/store';
import { browserReload } from './state/login/login.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private store: Store<UserState>){}
  
  ngOnInit(){
    let userData = window.localStorage.getItem('user-data') 
    const userToken = window.localStorage.getItem('user-token') 
    console.log();
    
    if(userData && userToken){
      userData = JSON.parse(userData);
      this.store.dispatch(browserReload({userToken,  userData}))
    }
  }


}
