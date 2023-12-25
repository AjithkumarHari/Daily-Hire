import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/login/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/login/login.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserAuthHeaderInterceptor } from './interceptors/user-auth-header.interceptor';

import { UserRoutingModule } from './user-routing.module';
import { DirectiveModule } from 'src/app/directives/directive.module';

import { environment } from 'src/environments/environment';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxStarsModule } from 'ngx-stars';
import { NgxStripeModule } from 'ngx-stripe';

import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { WageSortPipe } from './pipes/wage-sort.pipe';
import { AgeSortPipe } from './pipes/age-sort.pipe';

import { UserComponent } from './user.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SignupBoxComponent } from './pages/auth/signup-box/signup-box.component';
import { LoginBoxComponent } from './pages/auth/login-box/login-box.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainSectionComponent } from './pages/home/main-section/main-section.component';
import { CategoryComponent } from './pages/home/main-section/category/category.component';
import { SearchComponent } from './components/search/search.component';
import { OtpBoxComponent } from './pages/auth/otp-box/otp-box.component';
import { WorkerListComponent } from './pages/worker-list/worker-list.component';
import { WorkerDetailsComponent } from './pages/worker-details/worker-details.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { FilterComponent } from './components/filter/filter.component';
import { BookingFormBoxComponent } from './components/booking-form-box/booking-form-box.component';
import { NewBookingsComponent } from './pages/user-profile/new-bookings/new-bookings.component';
import { BookingHistoryComponent } from './pages/user-profile/booking-history/booking-history.component';
import { UpdateProfileComponent } from './pages/user-profile/update-profile/update-profile.component';
import { DateStringPipe } from './pipes/date-string.pipe';
import { BookingBoxComponent } from './components/booking-box/booking-box.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RupeesPipe } from './pipes/rupees-pipe.pipe';
import { WalletTransactionsComponent } from './components/wallet-transactions/wallet-transactions.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { ComplaintBoxComponent } from './components/complaint-box/complaint-box.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdvantagesComponent } from './components/advantages/advantages.component';
import { DetailsComponent } from './components/details/details.component';
 
@NgModule({
  declarations: [
    UserComponent,
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
    FilterComponent,
    WageSortPipe,
    AgeSortPipe,
    BookingFormBoxComponent,
    NewBookingsComponent,
    BookingHistoryComponent,
    UpdateProfileComponent,
    DateStringPipe,
    BookingBoxComponent,
    PaginationComponent,
    RupeesPipe,
    WalletTransactionsComponent,
    ChatBoxComponent,
    DateAgoPipe,
    ComplaintBoxComponent,
    FooterComponent,
    AdvantagesComponent,
    DetailsComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    StoreModule.forFeature('user', authReducer),
    EffectsModule.forFeature(AuthEffects),
    SocialLoginModule,
    GoogleSigninButtonModule,
    NgOtpInputModule,
    NgxStarsModule,
    NgxStripeModule.forRoot('pk_test_51OFsOJSDlgqaDxgfrx83NzkCWIKqRIeVLjNNHxcU7NrXLEMrddNWCnHHhYmWGB1cGDsvFQvnRvFM80h9aAXLqZ1100AWYv1XL9'),
    DirectiveModule,
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
    {
      provide : HTTP_INTERCEPTORS,
      useClass : UserAuthHeaderInterceptor,
      multi : true
    }
  ],
})
export class UserModule { }
