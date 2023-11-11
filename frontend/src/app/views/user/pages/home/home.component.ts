import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectToken } from '../../state/login/login.selector';
import { UserState } from '../../state/user.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private store: Store<UserState>){

  }
  ngOnInit(): void {
    this.store.pipe(select(selectToken)).subscribe((token)=>{
      console.log(token);
      
    })
  }

}
