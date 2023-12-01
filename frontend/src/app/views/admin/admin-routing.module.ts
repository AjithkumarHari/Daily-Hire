import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { adminGuard } from './guards/admin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { WorkerManagementComponent } from './components/worker-management/worker-management.component';
import { ServiceManagementComponent } from './components/service-management/service-management.component';
import { EditServiceBoxComponent } from './components/edit-service-box/edit-service-box.component';
import { ReviewManagementComponent } from './components/review-management/review-management.component';
import { BookingManagementComponent } from './components/booking-management/booking-management.component';

const routes: Routes = [
  { path:'auth', component: AuthComponent },
  { path:'', component: HomeComponent, canActivate: [adminGuard], children:[
    { path:'dashboard', component: DashboardComponent, },
    { path: 'user', component: UserManagementComponent },
    { path: 'worker', component: WorkerManagementComponent },
    { path: 'service', component: ServiceManagementComponent , children: [
     { path: 'edit', component: EditServiceBoxComponent}
    ]},
    { path: 'review', component: ReviewManagementComponent },
    { path: 'booking', component: BookingManagementComponent }
  ],},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
