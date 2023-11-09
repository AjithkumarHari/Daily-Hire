import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Store, select } from '@ngrx/store';
import { selectUserData } from '../../state/login/login.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-box',
  templateUrl: './otp-box.component.html',
  styleUrls: ['./otp-box.component.css']
})
export class OtpBoxComponent {
 
  email: string = ""
  phoneNumber!: number
 
  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any; config = { allowNumbersOnly: true, length: 5, isPasswordInput: false, disableAutoFocus: false, placeholder: "*", inputStyles: { width: "50px", height: "50px", }, }; 

  constructor(private userService: UserService, private store: Store, private router: Router){}
 
  ngOnInit(): void {
    const user = this.store.pipe(select(selectUserData)).subscribe((userData) => {
      this.email = userData.email;
      this.phoneNumber = userData.phone; 
    });
  }

 
  onOtpChange(event: string){
    if(event.length==6){
      const data = {
        email: this.email,
        phoneNumber: this.phoneNumber,
        code: event
      }
       this.userService.verifySignupOtp(data).subscribe({
          next: (response: any) => {
            console.log(response);
            
            this.router.navigateByUrl('/auth/login');
          },
          error: (err) => {
            console.log(err);
            
          }
        });
    }
  }
}
