import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentPost } from 'src/app/model/commentPost-dto.model';
import { CommentService } from 'src/app/services/comment/comment.service';
// import { CommentPost } from 'src/app/_dto/commentPost-dto.model/CommentPost';// Adjust the import path accordingly

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent {
  @Input() postId: any; // Declare postId input property
  userId!:number ;
  commentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private createCommentService: CommentService,
  ) {
   
    const authUserString = sessionStorage.getItem('auth-user');
    if (authUserString !== null) {
      const authUser = JSON.parse(authUserString);
      this.userId = authUser.id;
      console.log(this.userId)
    } else {
      console.error('No user data found in sessionStorage.');
    }
    this.commentForm = this.formBuilder.group({
      postId: [this.postId, Validators.required], // Set postId as default value
      user:{id: this.userId}, // Set default userId or remove if not needed
      content: ['', Validators.required] // Assuming 'content' is the field in your form
      // Add other form controls if needed
    });
  }

  ngOnInit(): void {
  }
  reloadOtherComponent() {
    // Trigger reload of other component
    this.createCommentService.reloadComponent();
  }

  submitComment() {
    this.commentForm.value.postId = this.postId;
    console.log(this.postId)
    console.log(this.commentForm.value);
    
    if (this.commentForm.value) {
      const { postId, user, content } = this.commentForm.value;
      const comment: CommentPost = { postId, user, content }; // Create a comment object
      this.createCommentService.createComment(comment).subscribe(
        (response) => {
          console.log('Comment submitted successfully:', response);
          // Optionally display a success message or perform any other actions
          // Reset the form after submission
          this.commentForm.reset();
        },
        (error) => {
          console.error('Error submitting comment:', error);
          // Optionally display an error message or perform any other error handling
        }
      );
    }
  }
}



//import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CommentService } from 'src/app/services/comment/comment.service';

// @Component({
//   selector: 'app-create-comment',
//   templateUrl: './create-comment.component.html',
//   styleUrls: ['./create-comment.component.css']
// })
// export class CreateCommentComponent {
//   commentForm: FormGroup;

//   constructor(
//     private formBuilder: FormBuilder,
//     private createCommentService: CommentService
//   ) {
//     this.commentForm = this.formBuilder.group({
//       postId: [1, Validators.required], // Set default postId or remove if not needed
//       userId: [1, Validators.required], // Set default userId or remove if not needed
//       content: ['', Validators.required] // Assuming 'content' is the field in your form
//       // Add other form controls if needed
//     });
//   }

//   ngOnInit(): void {
//   }

//   submitComment() {
//     if (this.commentForm.valid) {
//       const { postId, userId, content } = this.commentForm.value;
//       const comment: CommentPost = { postId, userId, content }; // Create a comment object
//       this.createCommentService.createComment(comment).subscribe(
//         (response) => {
//           console.log('Comment submitted successfully:', response);
//           // Optionally display a success message or perform any other actions
//           // Reset the form after submission
//           this.commentForm.reset();
//         },
//         (error) => {
//           console.error('Error submitting comment:', error);
//           // Optionally display an error message or perform any other error handling
//         }
//       );
//     }
//   }
// }
