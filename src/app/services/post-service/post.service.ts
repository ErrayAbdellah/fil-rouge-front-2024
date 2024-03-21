import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, CreatePost } from 'src/app/_dto/post-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:8081/v1/api-post'; // Update the API URL accordingly

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}`);
  }
  createPost(newPost: CreatePost): Observable<any> {
    return this.http.post(`${this.apiUrl}`, newPost);
  }
}
