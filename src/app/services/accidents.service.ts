import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accidents } from '../models/accidents.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccidentsService {
  private apiUrl = 'http://localhost:8090/accidents';

  constructor(private http: HttpClient,private authService:AuthService) {}

  getAllAccidents(): Observable<Accidents[]> {
    return this.http.get<Accidents[]>(this.apiUrl,{
      headers: this.authService.getAuthHeaders()
    });
  }

  getAccidentById(id: number): Observable<Accidents> {
    return this.http.get<Accidents>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  addAccidents(accident: Accidents): Observable<Accidents> {
    return this.http.post<Accidents>(this.apiUrl, accident, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateAccident(id: number, accident: Accidents): Observable<Accidents> {
    return this.http.put<Accidents>(`${this.apiUrl}/${id}`, accident, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteAccident(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}