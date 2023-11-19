import { TestBed } from '@angular/core/testing';

import { WorekrAuthHeaderInterceptor } from './worker-auth-header.interceptor';

describe('WorekrAuthHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      WorekrAuthHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: WorekrAuthHeaderInterceptor = TestBed.inject(WorekrAuthHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
