import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitation } from '../models/habitation.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HabitationService {
  private apiUrl = 'http://localhost:8090/habitation';

  constructor(private http: HttpClient,private authService:AuthService) {}

  getAllHabitations(): Observable<Habitation[]> {
    return this.http.get<Habitation[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getHabitationById(id: number): Observable<Habitation> {
    return this.http.get<Habitation>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createHabitation(habitation: Habitation): Observable<Habitation> {
    return this.http.post<Habitation>(this.apiUrl, habitation, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateHabitation(id: number, habitation: Habitation): Observable<Habitation> {
    return this.http.put<Habitation>(`${this.apiUrl}/${id}`, habitation, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteHabitation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}