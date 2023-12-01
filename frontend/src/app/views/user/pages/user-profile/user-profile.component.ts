import { Component } from '@angular/core';
import { UserState } from '../../state/user.state';
import { Store, select } from '@ngrx/store';
import { selectUserData } from '../../state/login/login.selector';
import { User } from 'src/app/types/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  user$!: User;

  constructor(private store: Store<UserState>, private userService: UserService){}
  
  ngOnInit(){
    this.store.pipe(select(selectUserData)).subscribe((data) => {
      this.user$ = data;
    });
  }
}
