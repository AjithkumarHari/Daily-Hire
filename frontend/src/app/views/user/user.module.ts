import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/login/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/login/login.effects';

import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forRoot({ user: authReducer}),
    EffectsModule.forRoot(AuthEffects)
  ]
})
export class UserModule { }
