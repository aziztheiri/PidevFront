import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Post } from '../models/post.model';
import { Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private baseUrl = 'http://localhost:8090/forum';

  constructor(private http: HttpClient,private authService:AuthService) { }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts/`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Get a specific post by id
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}/`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Create a new post, using the custom route with CIN in the URL.
  // The cin parameter is included in the URL.
  createPost(post: Post): Observable<Post> {
     const currentUser = this.authService.currentUserSubject.getValue();
        if (!currentUser || !currentUser.cin) {
          return throwError(() => new Error('User is not authenticated or CIN is missing'));
        }
        const cin = currentUser.cin;
    return this.http.post<Post>(`${this.baseUrl}/add/${cin}/`, post, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Update an existing post by id (PUT)
  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${id}/`, post, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Delete a post by id
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/posts/${id}/`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
