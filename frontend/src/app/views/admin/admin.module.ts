import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/login/admin.login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/login/admin.login.effects';
import { AuthComponent } from './pages/auth/auth.component';
 
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { WorkerManagementComponent } from './components/worker-management/worker-management.component';
import { ServiceManagementComponent } from './components/service-management/service-management.component';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';


@NgModule({
  declarations: [
    AuthComponent,
    HomeComponent,
    NavBarComponent,
    SideBarComponent,
    DashboardComponent,
    UserManagementComponent,
    WorkerManagementComponent,
    ServiceManagementComponent,
    PhoneNumberPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('admin', authReducer),
    EffectsModule.forFeature(AuthEffects)
  ]
})
export class AdminModule { }
