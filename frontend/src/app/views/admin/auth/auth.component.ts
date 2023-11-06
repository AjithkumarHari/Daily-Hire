import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { adminLoginRequest } from '../state/login/admin.login.action';
import { selectErrorMessage } from '../state/login/admin.login.selector';
import { Store, select } from '@ngrx/store';
import { AdminState } from '../state/admin.state';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  form!: FormGroup;
  errorMessage: any = " "

  constructor(private formBuilder : FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private store: Store<AdminState>
    ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$")]),
      password : new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
    })
  }


  onFormSubmit(){
    console.log(this.form);
    
    const credentials: {email: string, password: string} ={
      email : this.form.value.email,
      password : this.form.value.password
    }

    console.log(credentials);
    
    this.store.dispatch(adminLoginRequest({credentials}))
 
      this.store.pipe(select(selectErrorMessage)).subscribe((error) => {
      this.errorMessage = error
      console.log("login",this.errorMessage);  
    }
    );
    
    // this.adminService.login(credentials).subscribe({
    //   next: (response) => {
    //     this.router.navigateByUrl('/admin');
    //   },
    //   error: (err) => {
    //     console.log(err.error.message);
    //     this.errorMessage = err.error.message
    //   }
    // });
    
  }
}
