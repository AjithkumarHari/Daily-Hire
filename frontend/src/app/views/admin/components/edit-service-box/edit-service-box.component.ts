import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-service-box',
  templateUrl: './edit-service-box.component.html',
  styleUrls: ['./edit-service-box.component.css']
})
export class EditServiceBoxComponent {

  form!: FormGroup;
  errorMessage: string = "";

  name: any;
  description: any;
  _id: any;

  constructor( private formBuilder: FormBuilder, private adminService: AdminService, private router: Router,  private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.name = this.activatedRoute.snapshot.paramMap.get('name')
    this.description = this.activatedRoute.snapshot.paramMap.get('description');
    this._id = this.activatedRoute.snapshot.paramMap.get('_id');
    this.form = this.formBuilder.group({
      name : new FormControl(this.name, [Validators.required, Validators.pattern("^[a-zA-Z]{3,15}$")]),
      description : new FormControl(this.description, [Validators.required, Validators.maxLength(30)]),
    })
  }

  onSubmit(){
    const data ={
      _id: this._id,
      name: this.form.value.name,
      description: this.form.value.description
    }
 
    this.adminService.editService(data).subscribe({
      next: (response: any) => {
        if(response.status=="success"){
          this.form.reset();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['admin/service']);
          });
        }else{
          this.errorMessage = response.message
          setTimeout(()=>{
            this.errorMessage = " "
          },2000)
        }
      },
      error: (err) => {
        console.log(err);
      }
    }) 
  }
}
