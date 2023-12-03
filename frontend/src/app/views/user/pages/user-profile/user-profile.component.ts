import { Component } from '@angular/core';
import { UserState } from '../../state/user.state';
import { Store, select } from '@ngrx/store';
import { selectUserData } from '../../state/login/login.selector';
import { User } from 'src/app/types/User';
import { UserService } from '../../services/user.service';
import { Wallet } from 'src/app/types/Wallet';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  user$!: User;
  wallet$!: Wallet;

  constructor(private store: Store<UserState>, private userService: UserService){}
  
  ngOnInit(){
    this.store.pipe(select(selectUserData)).subscribe((data) => {
      this.user$ = data;
      if(this.user$._id)
        this.userService.getWalletByUser(this.user$._id).subscribe((data)=> this.wallet$ = data );
    });
  }
}
