import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LoginBoxComponent } from './auth/login-box/login-box.component';
import { SignupBoxComponent } from './auth/signup-box/signup-box.component';
import { WorkerListComponent } from './worker-list/worker-list.component';
 

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path:'auth',component:AuthComponent,children:[
    {path:'login',component:LoginBoxComponent},
    {path:'signup',component:SignupBoxComponent}
  ]},
  {path:'workerList',component: WorkerListComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
