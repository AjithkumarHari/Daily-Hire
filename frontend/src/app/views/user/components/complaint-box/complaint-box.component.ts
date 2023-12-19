import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Complaint } from 'src/app/types/Complaint';

@Component({
  selector: 'app-complaint-box',
  templateUrl: './complaint-box.component.html',
  styleUrls: ['./complaint-box.component.css']
})
export class ComplaintBoxComponent {

  form!: FormGroup;
  workerId: any;
  workerName: any;
  userId: any;
  userName: any;
  complaint: any;

  constructor(
    private formBuilder : FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ){}

  ngOnInit(): void{
    this.workerId = this.activatedRoute.snapshot.paramMap.get('workerId');
    this.workerName = this.activatedRoute.snapshot.paramMap.get('workerName');
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
    this.userName = this.activatedRoute.snapshot.paramMap.get('userName');
    
    this.form = this.formBuilder.group({
      complaint : new FormControl(null, [Validators.required,]),
      description : new FormControl(null, [Validators.required,]),
      type : new FormControl('Worker Behavioural Issues', [Validators.required,]),  
    })
  }

  onFormSubmit(){
    const complaint: Complaint ={
      complaint : this.form.value.complaint, 
      description : this.form.value.description,
      type : this.form.value.type,
      workerId: this.workerId,
      workerName: this.workerName,
      userId: this.userId,
      userName: this.userName,
    }
    this.complaint = this.userService.addWorkerComplaint(complaint).subscribe();
  }

  ngOnDestroy(){
    this.complaint.unsubscribe();
  }

  
}
