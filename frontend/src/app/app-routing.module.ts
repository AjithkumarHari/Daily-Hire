import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { UserRoutingModule } from './views/user/user-routing.module';
import { WorkerComponent } from './views/worker/worker.component';
import { AdminComponent } from './views/admin/admin.component';
import { WorkerRoutingModule } from './views/worker/worker-routing.module';
import { AdminRoutingModule } from './views/admin/admin-routing.module';

const routes: Routes = [
  {path: '',component: UserComponent, loadChildren: ()=> UserRoutingModule},
  {path: 'worker', component: WorkerComponent, loadChildren: ()=> WorkerRoutingModule},
  {path: 'admin', component: AdminComponent, loadChildren: ()=> AdminRoutingModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
