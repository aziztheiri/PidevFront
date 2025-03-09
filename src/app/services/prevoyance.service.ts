import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prevoyance } from '../models/prevoyance.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PrevoyanceService {
  private apiUrl = 'http://localhost:8090/prevoyance';

  constructor(private http: HttpClient,private authService:AuthService) {}

  getAllPrevoyances(): Observable<Prevoyance[]> {
    return this.http.get<Prevoyance[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getPrevoyanceById(id: number): Observable<Prevoyance> {
    return this.http.get<Prevoyance>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createPrevoyance(prevoyance: Prevoyance): Observable<Prevoyance> {
    return this.http.post<Prevoyance>(this.apiUrl, prevoyance, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updatePrevoyance(id: number, prevoyance: Prevoyance): Observable<Prevoyance> {
    return this.http.put<Prevoyance>(`${this.apiUrl}/${id}`, prevoyance, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deletePrevoyance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}