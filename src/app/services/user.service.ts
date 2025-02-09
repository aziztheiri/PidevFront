import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8083/users';

  constructor(private http: HttpClient) { }

  signup(user: User, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (image) {
      formData.append('image', image);
    }

    return this.http.post(`${this.baseUrl}`, formData);
  }
}
