import { Component, ViewChild } from '@angular/core';
import { UserAuthService } from '../../../services/user.auth.service';
import { Store, select } from '@ngrx/store';
import { selectErrorMessage, selectUserData } from '../../../state/login/login.selector';
import { Router } from '@angular/router';
import { verifyRequest } from '../../../state/login/login.action';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-otp-box',
  templateUrl: './otp-box.component.html',
  styleUrls: ['./otp-box.component.css']
})
export class OtpBoxComponent {
 
  email: string = ""
  phoneNumber!: number
  errorMessage: string = "";
  seconds: number = 60;
  showResendButton: boolean = true;
  timer: any;
  
 
  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any; config = { allowNumbersOnly: true, length: 5, isPasswordInput: false, disableAutoFocus: false, placeholder: "*", inputStyles: { width: "50px", height: "50px", }, }; 

  constructor(private userService: UserAuthService, private store: Store, private router: Router){}
 
  ngOnInit(): void {
    this.startTimer();

    const user = this.store.pipe(select(selectUserData)).pipe(take(1)).subscribe((userData) => {
      this.email = userData.email;
      this.phoneNumber = userData.phone; 
    });
  }


  startTimer() {
    this.timer = setInterval(() => {
      this.seconds--;
      if (this.seconds <= 0) {
        clearInterval(this.timer);
      }
      if(this.seconds==0){
        this.showResendButton = false
      }
    }, 1000);
  }

 
  onOtpChange(event: string){
    if(event.length==6){
      const user = {
        email: this.email,
        phoneNumber: this.phoneNumber,
        code: event
      }
      this.store.dispatch(verifyRequest({user}))
 
      this.store.pipe(select(selectErrorMessage)).subscribe((error) => {
        this.errorMessage = error  
      });
    }
  }

  resendOtp(){
    this.userService.resendOtp(this.phoneNumber)
    console.log('resend');
    
  }
}
