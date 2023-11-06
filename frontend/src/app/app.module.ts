import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewsComponent } from './views/views.component';
import { UserComponent } from './views/user/user.component';
import { WorkerComponent } from './views/worker/worker.component';
import { AdminComponent } from './views/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './views/user/user.module';
import { WorkerModule } from './views/worker/worker.module';
import { AdminModule } from './views/admin/admin.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    ViewsComponent,
    UserComponent,
    WorkerComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    HttpClientModule,
    WorkerModule,
    AdminModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot()
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
