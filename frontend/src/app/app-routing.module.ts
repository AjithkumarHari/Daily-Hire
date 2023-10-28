import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { LoginSignupComponent } from './views/user/login-signup/login-signup.component';
import { LoginBoxComponent } from './views/user/login-signup/login-box/login-box.component';
import { SignupBoxComponent } from './views/user/login-signup/signup-box/signup-box.component';

const routes: Routes = [
  {path: 'user',component: UserComponent,children:[
    {path:'auth',component:LoginSignupComponent,children:[
      {path:'login',component:LoginBoxComponent},
      {path:'signup',component:SignupBoxComponent}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
