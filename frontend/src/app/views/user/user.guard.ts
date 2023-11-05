import { CanActivateFn } from '@angular/router';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if(userService.getToken()){
    return true
  } else{
      router.navigate(['auth/login'])
      return false
  }
   
};
