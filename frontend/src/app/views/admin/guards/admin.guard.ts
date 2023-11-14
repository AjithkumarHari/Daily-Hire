import { CanActivateFn } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service'; 
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminAuthService);
  const router = inject(Router);

  if(adminService.getToken()){
    return true
  } else{
      router.navigate(['admin/auth'])
      return false
  }
};
