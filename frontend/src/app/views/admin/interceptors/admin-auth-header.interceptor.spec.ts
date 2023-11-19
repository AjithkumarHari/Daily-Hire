import { TestBed } from '@angular/core/testing';

import { AdminAuthHeaderInterceptor } from './admin-auth-header.interceptor';

describe('AdminAuthHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminAuthHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AdminAuthHeaderInterceptor = TestBed.inject(AdminAuthHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
