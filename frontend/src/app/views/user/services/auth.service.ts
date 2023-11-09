import { Injectable } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private socialAuthService: SocialAuthService,) { }

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
}
