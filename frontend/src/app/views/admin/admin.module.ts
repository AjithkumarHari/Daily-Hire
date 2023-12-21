import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/login/admin.login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/login/admin.login.effects';
import { AuthComponent } from './pages/auth/auth.component';
 
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { WorkerManagementComponent } from './components/worker-management/worker-management.component';
import { ServiceManagementComponent } from './components/service-management/service-management.component';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { AddServiceBoxComponent } from './components/add-service-box/add-service-box.component';
import { EditServiceBoxComponent } from './components/edit-service-box/edit-service-box.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminAuthHeaderInterceptor } from './interceptors/admin-auth-header.interceptor';
import { ReviewManagementComponent } from './components/review-management/review-management.component';
import { BookingManagementComponent } from './components/booking-management/booking-management.component';
import { DateStringPipe } from './pipes/date-string.pipe';

import { AgChartsAngularModule } from 'ag-charts-angular';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { WorkerDetailsComponent } from './components/worker-details/worker-details.component';

@NgModule({
  declarations: [
    AdminComponent,
    AuthComponent,
    HomeComponent,
    NavBarComponent,
    SideBarComponent,
    DashboardComponent,
    UserManagementComponent,
    WorkerManagementComponent,
    ServiceManagementComponent,
    PhoneNumberPipe,
    AddServiceBoxComponent,
    EditServiceBoxComponent,
    ReviewManagementComponent,
    BookingManagementComponent,
    DateStringPipe,
    BookingDetailsComponent,
    WorkerDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('admin', authReducer),
    EffectsModule.forFeature(AuthEffects),
    AgChartsAngularModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AdminAuthHeaderInterceptor,
      multi : true
    }
  ]
})
export class AdminModule { }
