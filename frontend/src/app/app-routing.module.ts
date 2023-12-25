import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { WorkerComponent } from './views/worker/worker.component';
import { AdminComponent } from './views/admin/admin.component';
import { NotFoundErrorComponent } from './errorPages/not-found-error/not-found-error.component';
 
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    loadChildren: () => import('./views/user/user-routing.module').then(m => m.UserRoutingModule),
  },
  {
    path: 'worker',
    component: WorkerComponent,
    loadChildren: () => import('./views/worker/worker.module').then(m => m.WorkerModule),
  },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: '**',
    component: NotFoundErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
