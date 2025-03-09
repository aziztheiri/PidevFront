import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Garanties } from '../models/garanties.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GarantiesService {
  private apiUrl = 'http://localhost:8090/garanties';

  constructor(private http: HttpClient,private authService:AuthService) {}

  getAllGaranties(): Observable<Garanties[]> {
    return this.http.get<Garanties[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getGarantieById(id: number): Observable<Garanties> {
    return this.http.get<Garanties>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createGarantie(garantie: Garanties): Observable<Garanties> {
    return this.http.post<Garanties>(this.apiUrl, garantie, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateGarantie(id: number, garantie: Garanties): Observable<Garanties> {
    return this.http.put<Garanties>(`${this.apiUrl}/${id}`, garantie, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteGarantie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}