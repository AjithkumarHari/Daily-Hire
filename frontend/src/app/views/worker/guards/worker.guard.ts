import { CanActivateFn } from '@angular/router';
import { WorkerAuthService } from '../services/worker-auth-service.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const workerGuard: CanActivateFn = (route, state) => {
  const workerAuthService = inject(WorkerAuthService);
  const router = inject(Router);

  if(workerAuthService.getToken()){
    return true
  } else{
      router.navigate(['worker/auth/login'])
      return false
  }
};
