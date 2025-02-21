import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators'; // ✅ Import tap operator

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8083/users';
  public signupEmail: string | null = null;

  constructor(private http: HttpClient) { }
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  signup(user: User, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (image) {
      formData.append('image', image);
    }
    return this.http.post(`${this.baseUrl}/signup`, formData).pipe(
      tap(() => {
        // Store email in localStorage after successful signup
        localStorage.setItem('signupEmail', user.email);
      })
    );
    return this.http.post(`${this.baseUrl}`, formData);
  }
  verifyOtp(data: { email: string, otp: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify`, data, { responseType: 'text' });
  }
  resendOtp(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/resend-otp`, { email },{ responseType: 'text' });
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/admin`, { headers: this.getAuthHeaders() });
  }
  deleteUser(cin: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/admin/${cin}`, { 
      headers: this.getAuthHeaders(), 
      responseType: 'text' 
    });
  }
  updateUser(cin: string, user: User, image?: File): Observable<User> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (image) {
      formData.append('image', image);
    }
    return this.http.put<User>(`${this.baseUrl}/admin/${cin}`, formData, { headers: this.getAuthHeaders() });
  }
  updateNotAdminUser(cin: string, user: User, image?: File): Observable<User> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (image) {
      formData.append('image', image);
    }
    return this.http.put<User>(`${this.baseUrl}/user/${cin}`, formData, { headers: this.getAuthHeaders() });
  }
  desactivateUser(cin: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/admin/desactivate/${cin}`, {}, { headers: this.getAuthHeaders() });
  }

  activateUser(cin: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/admin/activate/${cin}`, {}, { headers: this.getAuthHeaders() });
  }
  
}
