import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voyage } from '../models/voyage.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class VoyageService {
  private apiUrl = 'http://localhost:8090/voyage';

  constructor(private http: HttpClient,private authService:AuthService) {}

  getAllVoyages(): Observable<Voyage[]> {
    return this.http.get<Voyage[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getVoyageById(id: number): Observable<Voyage> {
    return this.http.get<Voyage>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createVoyage(voyage: Voyage): Observable<Voyage> {
    return this.http.post<Voyage>(this.apiUrl, voyage, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateVoyage(id: number, voyage: Voyage): Observable<Voyage> {
    return this.http.put<Voyage>(`${this.apiUrl}/${id}`, voyage, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteVoyage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}