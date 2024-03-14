import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Gender, UserDTO } from 'src/app/_dto/user-dto.model';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: UserDTO = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bio: '',
    profilePictureUrl: '',
    gender: Gender.MALE // Assuming Gender enum is imported and set properly
  };
  isRegistrationSuccess = false;
  isRegistrationFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router,private fireStorage:AngularFireStorage) { }
  private  async readAndUploadFile(file: File) {
    const reader = new FileReader();
    console.log(file)
      if(file){
        const path = `yt/${file.name}`;
        const uploadImage = await this.fireStorage.upload(path,file)
        const url = await uploadImage.ref.getDownloadURL();
        console.log(url);
        this.form.profilePictureUrl = url;
        this.saveUser();
        
      }
    }
 
  onSubmit(): void {
    const fileInput = document.getElementById('profilePictureUrl') as HTMLInputElement;
    const file = (fileInput.files as FileList)[0];
    if (file) {
      this.readAndUploadFile(file);
      console.log(file)
    } else {
      this.saveUser();
      console.error('No file select ed');
    }
  }

  saveUser(){
    const { firstName, lastName, email, password, bio, profilePictureUrl, gender } = this.form;
    this.authService.register(firstName, lastName, email, password, bio, profilePictureUrl, gender).subscribe({
      next: () => {
        this.isRegistrationSuccess = true;
        this.isRegistrationFailed = false;
        this.router.navigate(['/signin']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isRegistrationFailed = true;
      }
    });
  }
}
