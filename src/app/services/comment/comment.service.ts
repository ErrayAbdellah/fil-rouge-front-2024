import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommentPost } from 'src/app/model/commentPost-dto.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://localhost:8081/api/comments'; // Replace with your actual backend API URL
  private reloadSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  reloadComponent() {
    this.reloadSubject.next();
  }

  getReloadObservable() {
    return this.reloadSubject.asObservable();
  }
  createComment(comment: CommentPost): Observable<any> {
    console.log("hnaaaaaaa"+comment);
    
    return this.http.post(this.baseUrl, comment);
  }
  
  getAllCommentsByPostId(postId: number): Observable<any[]> {
    const url = `${this.baseUrl}/${postId}`;
    return this.http.get<any[]>(url);
  }
}
