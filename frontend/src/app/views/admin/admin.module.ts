import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/login/admin.login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/login/admin.login.effects';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AuthComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ worker: authReducer}),
    EffectsModule.forRoot(AuthEffects)
  ]
})
export class AdminModule { }
