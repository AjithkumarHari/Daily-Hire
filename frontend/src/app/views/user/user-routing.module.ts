import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginBoxComponent } from './auth/login-box/login-box.component';
import { AuthComponent } from './auth/auth.component';
import { SignupBoxComponent } from './auth/signup-box/signup-box.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '',component:HomeComponent},
    {path:'auth',component:AuthComponent,children:[
      {path:'login',component:LoginBoxComponent},
      {path:'signup',component:SignupBoxComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
