import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-display-comment',
  templateUrl: './display-comment.component.html',
  styleUrls: ['./display-comment.component.css']
})
export class DisplayCommentComponent {
  @Input() postId: any;
  comments: any[] = [];

  constructor(private commentService: CommentService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments() {
    if (this.postId !== null) {
      this.commentService.getAllCommentsByPostId(this.postId).subscribe((comments: any[]) => {
        this.comments = comments;
        console.log(comments);
      });
    }
  }
}
