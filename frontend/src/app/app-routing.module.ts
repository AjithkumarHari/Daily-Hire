import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { UserRoutingModule } from './views/user/user-routing.module';
import { WorkerComponent } from './views/worker/worker.component';
import { AdminComponent } from './views/admin/admin.component';

const routes: Routes = [
  {path: '',component: UserComponent, loadChildren: ()=> UserRoutingModule},
  {path: 'worker', component: WorkerComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
