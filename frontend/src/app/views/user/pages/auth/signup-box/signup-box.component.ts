import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../../types/User';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { googleLoginRequest, signupRequest } from '../../../state/login/login.action';
import { selectErrorMessage, selectToken } from '../../../state/login/login.selector';
import { Store, select } from '@ngrx/store';
import { UserState } from '../../../state/user.state';

@Component({
  selector: 'app-signup-box',
  templateUrl: './signup-box.component.html',
  styleUrls: ['./signup-box.component.css']
})
export class SignupBoxComponent {

  errorMessage: any = " "
  form !: FormGroup;
  user! : SocialUser ;
  loggedIn!: boolean;

  constructor( 
    private formBuilder : FormBuilder,
    private userService: UserService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private store: Store<UserState>,
  ) { }

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
      name: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z]{3,15}$")]),
      phone: new FormControl(null, [Validators.required, Validators.pattern("[6-9]\\d{9}")]),
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]),
      password : new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
      confpassword: new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
    })
  }

  onFormSubmit(){
    const user : User ={
      name : this.form.value.name,
      email : this.form.value.email,
      phone : this.form.value.phone,
      password : this.form.value.password,
    }
    const confpassword = this.form.value.confpassword;
    if(user.password==confpassword){

      // this.userService.signup(user).subscribe({
      //   next: (response: any) => {
      //     console.log(response.result.phoneNumber);
          
      //     this.router.navigateByUrl('/auth/otp');
      //   },
      //   error: (err) => {
      //     console.log(err); 
      //   }
      // });

      
      this.store.dispatch(signupRequest({user}))
  
      this.store.pipe(select(selectErrorMessage)).subscribe((error) => {
        this.errorMessage = error
        console.log("signup",this.errorMessage);  
      });
      }
      else{
        this.errorMessage = "password not match"
      }
    
  }
}
