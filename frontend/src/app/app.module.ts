import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewsComponent } from './views/views.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserModule } from './views/user/user.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GlobalErrorHandler } from './service/global-error-handler.service';
import { ServerErrorInterceptor } from './interceptor/server-error.interceptor';
import { ComplaintManagementComponent } from './views/admin/components/complaint-management/complaint-management.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewsComponent,
    ComplaintManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
