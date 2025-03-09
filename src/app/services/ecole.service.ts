import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ecole } from '../models/ecole.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EcoleService {
  private apiUrl = 'http://localhost:8090/ecole';

  constructor(private http: HttpClient,private authService:AuthService) {}

  getAllEcoles(): Observable<Ecole[]> {
    return this.http.get<Ecole[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getEcoleById(id: number): Observable<Ecole> {
    return this.http.get<Ecole>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createEcole(ecole: Ecole): Observable<Ecole> {
    return this.http.post<Ecole>(this.apiUrl, ecole, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateEcole(id: number, ecole: Ecole): Observable<Ecole> {
    return this.http.put<Ecole>(`${this.apiUrl}/${id}`, ecole, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteEcole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}