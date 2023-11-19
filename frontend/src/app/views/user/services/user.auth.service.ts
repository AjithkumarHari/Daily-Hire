import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { User } from 'src/app/types/User';
import { HttpClient } from '@angular/common/http';
import { Credentials } from 'src/app/types/Credentials';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  server = environment.serverUrl;

  constructor( private socialAuthService: SocialAuthService, private http: HttpClient) { }

  async loginWithGoogle(): Promise<SocialUser> {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  async getGoogleToken(): Promise<string | null> {
    const user: SocialUser | null = await this.loginWithGoogle();
    if (user) {
      const idToken = user.idToken;
      return idToken;
    } else {
      return null;
    }
  }

  signup(user: User){
    return this.http.post(`${this.server}/auth/user-signup`, user);
  }

  login(credentials: Credentials){
    return this.http.post(`${this.server}/auth/user-login`,credentials);
  }

  signInWithGoogle(user: SocialUser){    
    return this.http.post(`${this.server}/auth/user-google-signin`,user);
  }

  verifySignupOtp(data: {email: string, phoneNumber: number, code: string}){    
    return this.http.post(`${this.server}/auth/user-otp`,data);
  }
  
  resendOtp(phoneNumber:number){
    return this.http.post(`${this.server}/auth/user-resend-otp`,phoneNumber);
  }
  
}
