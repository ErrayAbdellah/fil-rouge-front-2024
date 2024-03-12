import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  activeButton: string = '';
  checkRole(): boolean{
    const jwtToken = sessionStorage.getItem('auth-user');
    let role:string="" ;  
    if(jwtToken)
    role = JSON.parse(jwtToken).role.name;

    if (role === "ADMIN") {
      return true;
    } else {
      return false;
    }

  }
}
