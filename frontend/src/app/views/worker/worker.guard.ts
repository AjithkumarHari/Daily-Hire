import { CanActivateFn } from '@angular/router';
import { WorkerService } from './worker.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const workerGuard: CanActivateFn = (route, state) => {
  const workerService = inject(WorkerService);
  const router = inject(Router);

  if(workerService.getToken()){
    return true
  } else{
      router.navigate(['worker/auth/login'])
      return false
  }
};
