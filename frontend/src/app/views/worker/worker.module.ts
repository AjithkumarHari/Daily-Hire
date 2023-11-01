import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerRoutingModule } from './worker-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoginBoxComponent } from './auth/login-box/login-box.component';
import { SignupBoxComponent } from './auth/signup-box/signup-box.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginBoxComponent,
    SignupBoxComponent
  ],
  imports: [
    CommonModule,
    WorkerRoutingModule
  ]
})
export class WorkerModule { }
