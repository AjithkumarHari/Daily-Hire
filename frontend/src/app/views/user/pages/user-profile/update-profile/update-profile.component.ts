import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectUserData } from '../../../state/login/login.selector';
import { UserState } from '../../../state/user.state';
import { User } from 'src/app/types/User';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { editProfileRequest } from '../../../state/login/login.action';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {

  user!: User;
  form !: FormGroup;
  errorMessage: string = ''

  constructor( private store: Store<UserState>, private formBuilder: FormBuilder){}

  ngOnInit(){
    this.store.pipe(select(selectUserData)).pipe(take(1)).subscribe((data: any) => {
      this.user = data;
      this.form = this.formBuilder.group({
        name: new FormControl(this.user.name, [Validators.required, Validators.pattern("^[A-Za-z]*[A-Za-z][A-Za-z0-9-. _]*$"), Validators.maxLength(20)]),
        phone: new FormControl(this.user.phone, [Validators.required, Validators.pattern("[6-9]\\d{9}")]),
        email : new FormControl(this.user.email, [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]),
        password : new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
        confpassword: new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
      })
    });
  }

  onSubmit(){
    if(this.form.value.password == this.form.value.confpassword && this.user._id){
      const user: User = {
        name: this.form.value.name,
        email: this.form.value.email,
        phone: this.form.value.phone,
        password: this.form.value.password,
      }
      const userId = this.user._id;
      this.store.dispatch(editProfileRequest({ userId , user}))
    }else{
      this.errorMessage = "Password does not match !"
    }
    
  }
}
