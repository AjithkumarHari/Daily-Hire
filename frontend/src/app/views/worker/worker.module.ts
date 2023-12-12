import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { DateStringPipe } from './pipes/date-string.pipe';
import { CurrentBookingBoxComponent } from './components/current-booking-box/current-booking-box.component';
import { SelectedDayComponent } from './components/selected-day/selected-day.component';
import { BlockDayComponent } from './components/block-day/block-day.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { WorkerAppointmentHistoryComponent } from './components/worker-appointment-history/worker-appointment-history.component';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { UnblockDayComponent } from './components/unblock-day/unblock-day.component';

import { AgChartsAngularModule } from 'ag-charts-angular';
import { MessagesComponent } from './pages/messages/messages.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';

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
    OtpBoxComponent,
    DateStringPipe,
    CurrentBookingBoxComponent,
    SelectedDayComponent,
    BlockDayComponent,
    ProfileComponent,
    BookingsComponent,
    ScheduleComponent,
    WorkerAppointmentHistoryComponent,
    UnblockDayComponent,
    MessagesComponent,
    ChatBoxComponent,
    DateAgoPipe,
  ],
  imports: [
    WorkerRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('worker', authReducer),
    EffectsModule.forFeature(AuthEffects),
    NgOtpInputModule,
    DirectiveModule,
    AgChartsAngularModule
  ]
})
export class WorkerModule { }
