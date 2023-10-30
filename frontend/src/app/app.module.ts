import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewsComponent } from './views/views.component';
import { UserComponent } from './views/user/user.component';
import { SignupBoxComponent } from './views/user/auth/signup-box/signup-box.component';
import { LoginBoxComponent } from './views/user/auth/login-box/login-box.component';
import { WorkerComponent } from './views/worker/worker.component';
import { AdminComponent } from './views/admin/admin.component';
import { AuthComponent } from './views/user/auth/auth.component';
import { HomeComponent } from './views/user/home/home.component';
import { NavBarComponent } from './views/user/home/nav-bar/nav-bar.component';
import { MainSectionComponent } from './views/user/home/main-section/main-section.component';
import { CategoryComponent } from './views/user/home/main-section/category/category.component';
import { SearchComponent } from './views/user/home/search/search.component';
import { UserModule } from './views/user/user.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ViewsComponent,
    UserComponent,
    SignupBoxComponent,
    LoginBoxComponent,
    WorkerComponent,
    AdminComponent,
    AuthComponent,
    HomeComponent,
    NavBarComponent,
    MainSectionComponent,
    CategoryComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
