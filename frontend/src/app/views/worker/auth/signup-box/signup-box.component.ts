import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Worker } from '../../types/Worker';
import { Router } from '@angular/router';
import { WorkerService } from '../../worker.service';

@Component({
  selector: 'app-signup-box',
  templateUrl: './signup-box.component.html',
  styleUrls: ['./signup-box.component.css']
})
export class SignupBoxComponent {

  form !: FormGroup; 
  errorMessage: string = " "

  constructor( 
    private formBuilder : FormBuilder,
    private router: Router,
    private workerService: WorkerService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      phone: new FormControl(null, [Validators.required, Validators.min(10)]),
      age: new FormControl(null, [Validators.required, Validators.min(10)]),
      gender: new FormControl('select', [Validators.required]),
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$")]),
      password : new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      confpassword: new FormControl(null, [Validators.required,Validators.maxLength(8), Validators.minLength(8)]),
      work: new FormControl('work', [Validators.required, Validators.maxLength(30)]),
      experience: new FormControl(null, [Validators.required, Validators.min(2)]),
      wageForHour: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      wageForDay: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      location: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    })
    
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
    
    this.workerService.signup(worker).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/worker/auth/login');
      },
      error: (err) => {
        this.errorMessage = err.error.message
        console.log(err);
      }
    });
    
     
  }
}