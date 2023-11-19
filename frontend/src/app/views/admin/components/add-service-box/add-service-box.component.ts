import { Component  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-service-box',
  templateUrl: './add-service-box.component.html',
  styleUrls: ['./add-service-box.component.css']
})
export class AddServiceBoxComponent {

  form!: FormGroup;
  errorMessage: string = '';

  constructor( private formBuilder: FormBuilder, private adminService: AdminService, private router: Router,  private route: ActivatedRoute){}

  ngOnInit(){
    this.form = this.formBuilder.group({
      name : new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z]{3,15}$")]),
      description : new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    })
  }

  onSubmit(){
    const data ={
      name: this.form.value.name,
      description: this.form.value.description
    }


    this.adminService.addService(data).subscribe({
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
