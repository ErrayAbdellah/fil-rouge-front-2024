import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const jwtToken = sessionStorage.getItem('auth-user');
  let role:string="" ;  
  if(jwtToken)
  role = JSON.parse(jwtToken).role.name
  
  console.log(role);
    if (role === "ADMIN") {
      console.log('true Admin');
      return true;
    } else {
      console.log('Navigating to default route User');
      return false;
    }
};