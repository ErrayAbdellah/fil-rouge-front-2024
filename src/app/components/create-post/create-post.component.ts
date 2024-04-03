import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { CreatePost, Post } from 'src/app/_dto/post-dto.model';

import { PostService } from 'src/app/services/post-service/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
   postContent: string = '';
  imageUrl: string = '';
  id: number= 0; // Declare id here
  imagePreview: string | ArrayBuffer | null = null; // Variable to hold the selected image preview


  constructor(private postService: PostService,private fireStorage:AngularFireStorage) {}
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  

    onSubmit() {
      console.log("poooooost")
      
      const fileInput = document.getElementById('image_post') as HTMLInputElement;
      const file = (fileInput.files as FileList)[0];
        // console.log(file.name)
      if (file) {
        this.readAndUploadFile(file);
        console.log(file)
      } else {
        this.savePost()
        console.error('No file selected');
      }
     
      

      
  }

  private  async readAndUploadFile(file: File) {
    const reader = new FileReader();
    console.log(file)
      if(file){
        const path = `yt/${file.name}`;
        const uploadImage = await this.fireStorage.upload(path,file)
        const url = await uploadImage.ref.getDownloadURL();
        console.log(url);
        this.imageUrl = url;
        this.savePost();
        
      }
    }

    savePost(){
      
      const authUserString = sessionStorage.getItem('auth-user');
      if (authUserString !== null) {
        const authUser = JSON.parse(authUserString);
        this.id = authUser.id;
        console.log(authUser.id);
      } else {
        console.error('No user data found in sessionStorage.');
      }
      const newPost = {
        content: this.postContent,
        urlContent: this.imageUrl,
        typePost: this.imageUrl ? 'IMAGE' : 'TEXT', // Assuming if imageUrl is provided, it's an image post
        user: {id: this.id}, // Use this.id instead of a fixed user ID
      };
      this.postService.createPost(newPost).subscribe(
        
        () => {
          console.log('Post created successfully');
          // Display SweetAlert success popup
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Post created successfully',
          });
          window.location.reload();
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
    }
}
