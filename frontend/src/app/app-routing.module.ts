import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { WorkerComponent } from './views/worker/worker.component';
import { AdminComponent } from './views/admin/admin.component';
 
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    loadChildren: () => import('./views/user/user-routing.module').then(m => m.UserRoutingModule),
  },
  {
    path: 'worker',
    component: WorkerComponent,
    loadChildren: () => import('./views/worker/worker-routing.module').then(m => m.WorkerRoutingModule),
  },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('./views/admin/admin-routing.module').then(m => m.AdminRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
