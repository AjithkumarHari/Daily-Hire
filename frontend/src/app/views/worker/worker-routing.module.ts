import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { workerGuard } from './guards/worker.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginBoxComponent } from './pages/auth/login-box/login-box.component';
import { SignupBoxComponent } from './pages/auth/signup-box/signup-box.component';
import { OtpBoxComponent } from './pages/auth/otp-box/otp-box.component';

const routes: Routes = [
  { path:"", component: HomeComponent, canActivate: [workerGuard]},
  {path:'auth',component:AuthComponent,children:[
    { path:'login',component:LoginBoxComponent },
    { path:'signup',component:SignupBoxComponent },
    { path:'otp', component:OtpBoxComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerRoutingModule { }
