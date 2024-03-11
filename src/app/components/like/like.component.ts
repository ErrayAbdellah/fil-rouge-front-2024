import { Component, Input } from '@angular/core';
import { LikeService } from 'src/app/services/like/like.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent {

  @Input() postId: any; // Declare postId input property
  userId!:number ;
  liked: boolean = false;

  constructor(private likeService: LikeService) {
    const authUserString = sessionStorage.getItem('auth-user');
    if (authUserString !== null) {
      const authUser = JSON.parse(authUserString);
      this.userId = authUser.id;
      
      console.log(this.userId)
    } else {
      console.error('No user data found in sessionStorage.');
    }

   }

  likePost(postId: number, userId: number) {
    console.log("postId:", this.postId);
    console.log("userId:", userId);

    this.likeService.likePost(postId, userId).subscribe(() => {
        console.log('Post liked successfully');
        // Add any additional logic here after liking the post
    });
}

unlikePost(postId: number, userId: number) {
    console.log("postId:", postId);
    console.log("userId:", userId);

    this.likeService.unlikePost(postId, userId).subscribe(() => {
        console.log('Post unliked successfully');
        // Add any additional logic here after unliking the post
    });
}

}
