import { Component } from '@angular/core';
import { WorkerAuthService } from '../../../services/worker-auth-service.service';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectWorkerDetails, selectWorkerErrorMessage } from '../../../state/login/worker.login.selector';
import { workerVerifyRequest } from '../../../state/login/worker.login.action';
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

  constructor(private workerAuthService: WorkerAuthService, private store: Store, private router: Router){}

  ngOnInit(): void {
    this.startTimer();
    this.store.pipe(select(selectWorkerDetails)).pipe(take(1)).subscribe((workerData) => {
      this.email = workerData.email;
      this.phoneNumber = workerData.phone; 
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
      const worker = {
        email: this.email,
        phoneNumber: this.phoneNumber,
        code: event
      }
      this.store.dispatch(workerVerifyRequest({worker}))
      this.store.pipe(select(selectWorkerErrorMessage)).pipe(take(1)).subscribe((error) => {
        this.errorMessage = error  
      });
    }
  }

  resendOtp(){
    this.workerAuthService.resendOtp(this.phoneNumber)
    console.log('resend');
    
  }
}
