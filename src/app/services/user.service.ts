import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators'; // ✅ Import tap operator

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8090/users';
  public signupEmail: string | null = null;
  private apiUrl = 'http://localhost:8090/users/gemini-content';
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email }, { responseType: 'text' });
  }
  predictUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/cluster`,{ headers: this.getAuthHeaders()});
  }
  generateReport(){
    return this.http.get(`${this.baseUrl}/run-report`,{ headers: this.getAuthHeaders() ,responseType: 'text' },);
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { token, newPassword }, { responseType: 'text' });
  }
  getGeminiContent(): Observable<{ text: string }> { // Specify response type
    return this.http.post<{ text: string }>(this.apiUrl, {});
  }
  constructor(private http: HttpClient) { }
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  deleteUserr(cin: string, oldPassword: string): Observable<any> {
    const payload = { cin, oldPassword };
    return this.http.post(`${this.baseUrl}/user/delete-user`, payload, { 
      headers: this.getAuthHeaders(), 
      responseType: 'text' 
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
  
  updatePassword(cin: string, oldPassword: string, newPassword: string): Observable<string> {
    const body = { oldPassword, newPassword };
    return this.http.put(`${this.baseUrl}/user/password/${cin}`, body, { 
      headers: this.getAuthHeaders(), 
      responseType: 'text' 
    });
  }
}
