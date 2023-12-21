import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Worker } from 'src/app/types/Worker';
import { WorkerState } from '../../state/worker.state';
import { Store, select } from '@ngrx/store';
import { selectWorkerDetails, selectWorkerToken } from '../../state/login/worker.login.selector';
import { take } from 'rxjs/operators';
import { WorkerService } from '../../services/worker.service';
import { editWorkerProfileRequest } from '../../state/login/worker.login.action';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  worker!: Worker;
  works: any  = [];
  form !: FormGroup;
  errorMessage: string = '';

  @Output() onCancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEdit: EventEmitter<string> = new EventEmitter<string>();

  constructor( 
    private store: Store<WorkerState>,
    private formBuilder: FormBuilder,
    private workerService: WorkerService,
  ){}

  ngOnInit(){

    this.store.pipe(select(selectWorkerDetails)).pipe(take(1)).subscribe((data: any) => {
      console.log(data);
      this.worker = data;
      this.form = this.formBuilder.group({
        name: new FormControl(this.worker.name, [Validators.required, Validators.pattern("^[a-z_A-Z-]{3,15}$")]),
        phone: new FormControl(this.worker.phone, [Validators.required, Validators.pattern("[6-9]\\d{9}")]),
        age: new FormControl(this.worker.age, [Validators.required, Validators.pattern("^(?:1[8-9]|[2-5][0-9])$"), Validators.max(60)]),
        gender: new FormControl(this.worker.gender, [Validators.required]),
        email : new FormControl(this.worker.email, [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]),
        password : new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
        confpassword: new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
        work: new FormControl(this.worker.work,[Validators.required]),
        experience: new FormControl(this.worker.experience, [Validators.required, Validators.pattern("^[0-9]{1,45}$"), Validators.max(45)]),
        wageForHour: new FormControl(this.worker.wageForHour, [Validators.required, Validators.pattern("^[0-9]{1,5}?$")]),
        wageForDay: new FormControl(this.worker.wageForDay, [Validators.required, Validators.pattern("^[0-9]{1,5}?$")]),
        location: new FormControl(this.worker.location, [Validators.required, Validators.pattern("^[a-z_-]{3,20}$")]),
      })
    });

    this.workerService.getAllServices().pipe(take(1)).subscribe((data)=> this.works = data);
  }

  onSubmit(){
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
    console.log(worker);
    const workerId = this.worker._id;
    if(workerId)
      this.store.dispatch(editWorkerProfileRequest({ workerId , worker}))
      this.store.pipe(select(selectWorkerToken))
      .pipe(take(1)).subscribe((workerData)=> console.log(workerData)
      );
 
       
  }
  
  onCancelEdit(){
    this.onCancel.emit();
  }
}
