import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewsComponent } from './views/views.component';
import { UserComponent } from './views/user/user.component';
import { LoginSignupComponent } from './views/user/login-signup/login-signup.component';
import { SignupBoxComponent } from './views/user/login-signup/signup-box/signup-box.component';
import { LoginBoxComponent } from './views/user/login-signup/login-box/login-box.component';
import { WorkerComponent } from './views/worker/worker.component';
import { AdminComponent } from './views/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewsComponent,
    UserComponent,
    LoginSignupComponent,
    SignupBoxComponent,
    LoginBoxComponent,
    WorkerComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
