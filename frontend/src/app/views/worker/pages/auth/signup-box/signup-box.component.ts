import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Worker } from '../../../../../types/Worker';
import { Router } from '@angular/router';
import { WorkerAuthService } from '../../../services/worker-auth-service.service';
import { WorkerService } from '../../../services/worker.service';
import { Store, select } from '@ngrx/store';
import { workerSignupRequest } from '../../../state/login/worker.login.action';
import { selectWorkerErrorMessage, selectWorkerToken } from '../../../state/login/worker.login.selector';
import { WorkerState } from '../../../state/worker.state';

@Component({
  selector: 'app-signup-box',
  templateUrl: './signup-box.component.html',
  styleUrls: ['./signup-box.component.css']
})
export class SignupBoxComponent {

  works: any  = [];
  form !: FormGroup; 
  errorMessage: string = " "

  constructor( 
    private formBuilder : FormBuilder,
    private router: Router,
    private workerAuthService: WorkerAuthService,
    private workerService: WorkerService,
    private store: Store<WorkerState>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.pattern("^[a-z_A-Z-]{3,15}$")]),
      phone: new FormControl(null, [Validators.required, Validators.pattern("[6-9]\\d{9}")]),
      age: new FormControl(null, [Validators.required, Validators.pattern("^(?:1[8-9]|[2-5][0-9]|65)$")]),
      gender: new FormControl('select', [Validators.required]),
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]),
      password : new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
      confpassword: new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
      work: new FormControl('work', [Validators.required, Validators.maxLength(30)]),
      experience: new FormControl(null, [Validators.required, Validators.pattern("^([0-9]|45)$")]),
      wageForHour: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{1,5}?$")]),
      wageForDay: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{1,5}?$")]),
      location: new FormControl(null, [Validators.required, Validators.pattern("^[a-z_-]{3,20}$")]),
    })
    
    this.workerService.getAllServices().subscribe((data)=> this.works = data)

  }

  onFormSubmit(){

    const worker: Worker ={
      name : this.form.value.name,
      email : this.form.value.email,
      phone : this.form.value.phone,
      password : this.form.value.password,
      age : this.form.value.age,
      gender : this.form.value.gender,
      work : this.form.value.work,
      experience : this.form.value.experience,
      wageForHour : this.form.value.wageForHour,
      wageForDay : this.form.value.wageForDay,
      location : this.form.value.location,
    }

    const confpassword = this.form.value.confpassword;
    
    if(confpassword==worker.password){

      // this.workerAuthService.signup(worker).subscribe({
      //   next: (response) => {
      //     this.router.navigateByUrl('/worker/auth/login');
      //   },
      //   error: (err) => {
      //     this.errorMessage = err.error.message
      //     console.log(err);
      //   }
      // });

        
      this.store.dispatch(workerSignupRequest({worker}))
  
      this.store.pipe(select(selectWorkerErrorMessage)).subscribe((error) => {
  
        this.errorMessage = error
        console.log("signup",this.errorMessage);  
      });
    }else{
      this.errorMessage = "password not match"
    }

    
     
  }
}
