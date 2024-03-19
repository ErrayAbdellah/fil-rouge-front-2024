import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from 'src/app/_dto/user-dto.model';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userId!: number;
  user!: UserDTO;

  constructor() { }

  ngOnInit(): void {
    const authUserString = sessionStorage.getItem('auth-user');
    if (authUserString !== null) {
      const authUser = JSON.parse(authUserString);
      this.userId = authUser.id;
      this.user = authUser;
      console.log(authUser)
    } else {
      console.error('No user data found in sessionStorage.');
    }
  }

  // getUserById(userId: number): void {
  //   this.userService.getUserById(userId)
  //     .subscribe(
  //       (data: UserDTO) => {
  //         this.user = data;
  //       },
  //       error => {
  //         console.log('Error:', error);
  //         // Handle error as needed, e.g., display error message
  //       }
  //     );
  // }
}
