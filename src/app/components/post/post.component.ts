import { Component, Input } from '@angular/core';
import { Post } from 'src/app/_dto/post-dto.model';
import { PostService } from 'src/app/services/post-service/post.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  posts: Post[] = [];
  

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }
  @Input() post: any; // Assuming you have a Post interface or model

  // showComments: boolean = false;
  showComments: { [postId: number]: boolean } = {};

  toggleComments(postId: number): void {
    // Toggle the showComments property for the given postId
    this.showComments[postId] = !this.showComments[postId];
  }
  getPostId(post: any): number | null {
    return post && post.id ? post.id : null;
  }
  fetchPosts() {
    
    this.postService.getAllPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        console.log(posts)
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }
  
  // posts: Post[] = [];

  // constructor(private postService: PostService) {}

  // ngOnInit(): void {
  //   this.getPosts();
  // }

  // getPosts(): void {
  //   this.postService.getAllPosts().subscribe(
  //     posts => {
  //       console.log(posts)
  //       this.posts = posts;
  //     },
  //     error => {
  //       console.error('Error fetching posts:', error);
  //     }
  //   );
  // }
}
