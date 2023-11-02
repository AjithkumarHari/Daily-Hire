import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/login/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/login/login.effects';
import { AuthComponent } from './auth/auth.component';
import { SignupBoxComponent } from './auth/signup-box/signup-box.component';
import { LoginBoxComponent } from './auth/login-box/login-box.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { MainSectionComponent } from './home/main-section/main-section.component';
import { CategoryComponent } from './home/main-section/category/category.component';
import { SearchComponent } from './home/search/search.component';

import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    AuthComponent,
    SignupBoxComponent,
    LoginBoxComponent,
    HomeComponent,
    NavBarComponent,
    MainSectionComponent,
    CategoryComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    StoreModule.forRoot({ user: authReducer}),
    EffectsModule.forRoot(AuthEffects)
  ]
})
export class UserModule { }
