import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from '../../types/Credentials';
import { WorkerService } from '../../worker.service';
import { Store, select } from '@ngrx/store';
import { WorkerState } from '../../state/worker.state';
import { workerLoginRequest } from '../../state/login/worker.login.action';
import { selectErrorMessage } from '../../state/login/worker.login.selector';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit{
  form!: FormGroup;
  errorMessage: any = " "

  constructor(private formBuilder : FormBuilder,
    private workerService: WorkerService,
    private router: Router,
    private store: Store<WorkerState>
    ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$")]),
      password : new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)])
    })
  }


  onFormSubmit(){
    console.log(this.form);
    
    const credentials: Credentials ={
      email : this.form.value.email,
      password : this.form.value.password
    }

    console.log(credentials);

    this.store.dispatch(workerLoginRequest({credentials}))
 
      this.store.pipe(select(selectErrorMessage)).subscribe((error) => {
      this.errorMessage = error
      console.log("login",this.errorMessage);  
    }
    );
    
    // this.workerService.login(credentials).subscribe({
    //   next: (response) => {
    //     this.router.navigateByUrl('/worker');
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });
    
  }
}
