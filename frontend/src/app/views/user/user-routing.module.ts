import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LoginBoxComponent } from './auth/login-box/login-box.component';
import { SignupBoxComponent } from './auth/signup-box/signup-box.component';
import { WorkerListComponent } from './worker-list/worker-list.component';
import { WorkerDetailsComponent } from './worker-details/worker-details.component';
import { userGuard } from './guards/user.guard';
import { OtpBoxComponent } from './auth/otp-box/otp-box.component';
 

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path:'auth',component:AuthComponent,children:[
    {path:'login',component:LoginBoxComponent},
    {path:'signup',component:SignupBoxComponent},
    { path:'otp', component:OtpBoxComponent}
  ]},
  {path:'workerList',component: WorkerListComponent, canActivate: [userGuard]},
  { path: 'workerDetails/:id', component: WorkerDetailsComponent, canActivate: [userGuard]}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
