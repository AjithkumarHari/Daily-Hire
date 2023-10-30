import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../User';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-box',
  templateUrl: './signup-box.component.html',
  styleUrls: ['./signup-box.component.css']
})
export class SignupBoxComponent {

  form !: FormGroup; 
 

  constructor( 
    private formBuilder : FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      phone: new FormControl(null, [Validators.required, Validators.min(10)]),
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$")]),
      password : new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      confpassword: new FormControl(null, [Validators.required,Validators.maxLength(8), Validators.minLength(8)]),
    })
  }

  onFormSubmit(){
    console.log(this.form);
    
    const user : User ={
      name : this.form.value.name,
      email : this.form.value.email,
      phone : this.form.value.phone,
      password : this.form.value.password
    }
    console.log(user);
    
    this.userService.signup(user).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/auth/login');
      },
      error: (err) => {
        console.log(err);
        
      }
    });
    
     
  }
}
