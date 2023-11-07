import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../types/Credentials';
import { Store, select } from '@ngrx/store';
import { googleLoginRequest, loginRequest } from '../../state/login/login.action';
import { selectErrorMessage } from '../../state/login/login.selector';
import { UserState } from '../../state/user.state';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit{
  form!: FormGroup;
  errorMessage: any = " "
  user! : SocialUser ;
  loggedIn!: boolean;
 

  constructor(private formBuilder : FormBuilder,
    private socialAuthService: SocialAuthService,
    private store: Store<UserState>,
    ){}

  ngOnInit(): void {

    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
       
      this.store.dispatch(googleLoginRequest({user}))
 
      this.store.pipe(select(selectErrorMessage)).subscribe((error) => {
        this.errorMessage = error
        console.log("login",this.errorMessage);  
      });
    });

    this.form = this.formBuilder.group({
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$")]),
      password : new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)])
    })
  }


  onFormSubmit(){
    console.log('form sumbit');
    
    const credentials: Credentials ={
      email : this.form.value.email, 
      password : this.form.value.password
    }

    this.store.dispatch(loginRequest({credentials}))
 
    this.store.pipe(select(selectErrorMessage)).subscribe((error) => {
      this.errorMessage = error
      console.log("login",this.errorMessage);  
    });

  }
 
}
