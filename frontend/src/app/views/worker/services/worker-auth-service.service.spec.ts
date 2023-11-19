import { TestBed } from '@angular/core/testing';

import { WorkerAuthService } from './worker-auth-service.service';

describe('WorkerAuthService', () => {
  let service: WorkerAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
