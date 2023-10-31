import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../types/Credentials';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { SuccessRes } from '../../types/SuccessRes';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit{
  form!: FormGroup;
  errorMessage: string = " "

  constructor(private formBuilder : FormBuilder,
    private userService: UserService,
    private router: Router
    ){

  }
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

    this.userService.login(credentials).subscribe({
      next: (Response) => {

        console.log(Response);
 
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.log(err.error.message);
        this.errorMessage = err.error.message;
        setTimeout(() => this.errorMessage = '',3000);
      },
 
    }
    )
  }
}
