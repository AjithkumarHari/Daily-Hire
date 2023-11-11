import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginBoxComponent } from './pages/login-box/login-box.component';
import { SignupBoxComponent } from './pages/signup-box/signup-box.component';
import { WorkerListComponent } from './pages/worker-list/worker-list.component';
import { WorkerDetailsComponent } from './pages/worker-details/worker-details.component';
import { userGuard } from './guards/user.guard';
import { OtpBoxComponent } from './pages/auth/otp-box/otp-box.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
 

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path:'auth',component:AuthComponent,children:[
    {path:'login',component:LoginBoxComponent},
    {path:'signup',component:SignupBoxComponent},
    { path:'otp', component:OtpBoxComponent}
  ]},
  { path: 'workerList', component: WorkerListComponent, canActivate: [userGuard]},
  { path: 'workerDetails/:id', component: WorkerDetailsComponent, canActivate: [userGuard]},
  { path: 'services', component: ServiceListComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
