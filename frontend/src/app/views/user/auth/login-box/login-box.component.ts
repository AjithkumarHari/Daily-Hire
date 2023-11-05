import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../types/Credentials';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { loginRequest } from '../../state/login/login.action';
import { selectErrorMessage } from '../../state/login/login.selector';
import { UserState } from '../../state/user.state';
 


@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit{
  form!: FormGroup;
  errorMessage: any = " "

  constructor(private formBuilder : FormBuilder,
    private userService: UserService,
    private router: Router,
    private store: Store<UserState>
    ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$")]),
      password : new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)])
    })
  }


  onFormSubmit(){
    const credentials: Credentials ={
      email : this.form.value.email,
      password : this.form.value.password
    }

    this.store.dispatch(loginRequest({credentials}))
 
      this.store.pipe(select(selectErrorMessage)).subscribe((error) => {
      this.errorMessage = error
      
      console.log("login",this.errorMessage);  
    }
    );
  }
}
