// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { tap } from 'rxjs/operators'; // ✅ Import tap operator
import { User } from '../models/user.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenUrl = 'http://localhost:8180/realms/pidev-realm/protocol/openid-connect/token';
  private clientId = 'pidev-client';
  private apiUrl = 'http://localhost:8083/users';
  private realm = 'pidev-realm';  // Update with your actual realm name

  private keycloakUrl = `http://localhost:8180/realms/${this.realm}`;
  private logoutUrl = `${this.keycloakUrl}/protocol/openid-connect/logout`;

  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http.post<any>(this.tokenUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      // Store tokens when login is successful
      tap(response => {
        if (response.access_token && response.refresh_token) {
          localStorage.setItem('accessToken', response.access_token);
          localStorage.setItem('refreshToken', response.refresh_token);
        }
      })
    );
  }
  decodeToken(token: string): any {
    return jwt_decode.jwtDecode(token);
  }

  // Optional: Method to check if the user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    // Here you might decode and verify the token's expiration.
    return !!token;
  }





  logout(): void {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      console.warn('No refresh token found. Clearing session locally.');
      this.clearSession();
      return;
    }

    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('refresh_token', refreshToken);

    this.http.post(this.logoutUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe({
      next: () => {
        console.log('User logged out successfully');
        this.clearSession();
      },
      error: (error) => {
        console.error('Logout request failed:', error);
        this.clearSession(); // Ensure local session is cleared even if logout request fails
      }
    });
  }
  getUserInfo(): { email?: string } | null {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return null;
    }
    const decoded = this.decodeToken(token);
    return {
      email: decoded.email
    };
  }
  getUserDetails(): Observable<User> {
    const userInfo = this.getUserInfo();
    console.log(userInfo?.email);
    if (userInfo && userInfo.email) {
      return this.http.get<User>(`${this.apiUrl}/user/getemail/${userInfo.email}`,{ headers: this.getAuthHeaders() });
    }
    return throwError(() => new Error('User email not found in token'));
  }
  // 🔹 Clear Session
  private clearSession(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    console.log('Local session cleared');
  }
}
