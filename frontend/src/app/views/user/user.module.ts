import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/login/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/login/login.effects';
import { AuthComponent } from './pages/auth/auth.component';
import { SignupBoxComponent } from './pages/signup-box/signup-box.component';
import { LoginBoxComponent } from './pages/login-box/login-box.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainSectionComponent } from './pages/home/main-section/main-section.component';
import { CategoryComponent } from './pages/home/main-section/category/category.component';
import { SearchComponent } from './search/search.component';
import { OtpBoxComponent } from './pages/auth/otp-box/otp-box.component';

import { UserRoutingModule } from './user-routing.module';
import { WorkerListComponent } from './pages/worker-list/worker-list.component';
import { WorkerDetailsComponent } from './pages/worker-details/worker-details.component';

 
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { NgOtpInputModule } from 'ng-otp-input';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
 
@NgModule({
  declarations: [
    AuthComponent,
    SignupBoxComponent,
    LoginBoxComponent,
    HomeComponent,
    NavBarComponent,
    MainSectionComponent,
    CategoryComponent,
    SearchComponent,
    WorkerListComponent,
    WorkerDetailsComponent,
    OtpBoxComponent,
    PhoneNumberPipe,
    ServiceListComponent,
    UserProfileComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    StoreModule.forFeature('user', authReducer),
    EffectsModule.forFeature(AuthEffects),
    SocialLoginModule,
    GoogleSigninButtonModule,
    NgOtpInputModule,
 
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
})
export class UserModule { }
