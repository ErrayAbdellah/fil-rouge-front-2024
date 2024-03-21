import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private baseUrl = 'http://localhost:8081/api/likes';

  constructor(private http: HttpClient) { }

  likePost(postId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${postId}/${userId}`, {});
  }

  unlikePost(postId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${postId}/${userId}`);
  }
}
