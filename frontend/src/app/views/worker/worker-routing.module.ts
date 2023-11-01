import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginBoxComponent } from './auth/login-box/login-box.component';
import { SignupBoxComponent } from './auth/signup-box/signup-box.component';

const routes: Routes = [
  {path:'auth',component:AuthComponent,children:[
    {path:'login',component:LoginBoxComponent},
    {path:'signup',component:SignupBoxComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerRoutingModule { }
