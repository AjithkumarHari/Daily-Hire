import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WorkerRoutingModule } from './worker-routing.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/login/worker.login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/login/worker.login.effects';

import { WorkerComponent } from './worker.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginBoxComponent } from './pages/auth/login-box/login-box.component';
import { SignupBoxComponent } from './pages/auth/signup-box/signup-box.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WorkerProfileComponent } from './components/worker-profile/worker-profile.component';
import { WorkerCalenderComponent } from './components/worker-calender/worker-calender.component';
import { WorkerAppoinmentsComponent } from './components/worker-appoinments/worker-appoinments.component';
import { OtpBoxComponent } from './pages/auth/otp-box/otp-box.component';

import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [
    WorkerComponent,
    AuthComponent,
    LoginBoxComponent,
    SignupBoxComponent,
    HomeComponent,
    NavbarComponent,
    WorkerProfileComponent,
    WorkerCalenderComponent,
    WorkerAppoinmentsComponent,
    OtpBoxComponent
  ],
  imports: [
    WorkerRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('worker', authReducer),
    EffectsModule.forFeature(AuthEffects),
    NgOtpInputModule
  ]
})
export class WorkerModule { }
