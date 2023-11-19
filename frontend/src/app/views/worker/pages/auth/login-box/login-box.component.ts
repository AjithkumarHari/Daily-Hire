import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from '../../../../../types/Credentials';
import { WorkerService } from '../../../services/worker.service';
import { Store, select } from '@ngrx/store';
import { WorkerState } from '../../../state/worker.state';
import { workerLoginRequest } from '../../../state/login/worker.login.action';
import { selectWorkerErrorMessage } from '../../../state/login/worker.login.selector';

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
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]),
      password : new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
    })
  }


  onFormSubmit(){
    
    const credentials: Credentials ={
      email : this.form.value.email,
      password : this.form.value.password
    }

    console.log(credentials);

    this.store.dispatch(workerLoginRequest({credentials}))
 
      this.store.pipe(select(selectWorkerErrorMessage)).subscribe((error) => {
      this.errorMessage = error
      console.log("login",this.errorMessage);  
    }
    );
    
    // this.workerService.login(credentials).subscribe({
    //   next: (response) => {
    //     this.router.navigateByUrl('/worker');
    //   },
    //   error: (err) => {
    //     console.log(err.error.message);
    //   }
    // });
    
  }
}
