import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WorkerRoutingModule } from './worker-routing.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/login/worker.login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/login/worker.login.effects';
import { AuthComponent } from './auth/auth.component';
import { LoginBoxComponent } from './auth/login-box/login-box.component';
import { SignupBoxComponent } from './auth/signup-box/signup-box.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navbar/navbar.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginBoxComponent,
    SignupBoxComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    WorkerRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('worker', authReducer),
    EffectsModule.forFeature(AuthEffects)
  ]
})
export class WorkerModule { }
