import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { adminLoginRequest } from '../../state/login/admin.login.action';
import { selectErrorMessage } from '../../state/login/admin.login.selector';
import { Store, select } from '@ngrx/store';
import { AdminState } from '../../state/admin.state';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  form!: FormGroup;
  errorMessage: any = " "

  constructor(private formBuilder : FormBuilder,
    private store: Store<AdminState>
    ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]),
      password : new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
    })
  }


  onFormSubmit(){
    const credentials: {email: string, password: string} ={
      email : this.form.value.email,
      password : this.form.value.password
    }

    this.store.dispatch(adminLoginRequest({credentials}))
      this.store.pipe(select(selectErrorMessage)).pipe(take(1)).subscribe((error) => {
      this.errorMessage = error
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
