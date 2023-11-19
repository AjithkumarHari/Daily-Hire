import { TestBed } from '@angular/core/testing';

import { UserAuthHeaderInterceptor } from './user-auth-header.interceptor';

describe('UserAuthHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UserAuthHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UserAuthHeaderInterceptor = TestBed.inject(UserAuthHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
