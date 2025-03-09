import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SanteInternationale } from '../models/santeinternationale.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SanteInternationaleService {
  private apiUrl = 'http://localhost:8090/sante-internationale';

  constructor(private http: HttpClient,private authService:AuthService) {}

  getAllSanteInternationales(): Observable<SanteInternationale[]> {
    return this.http.get<SanteInternationale[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getSanteInternationaleById(id: number): Observable<SanteInternationale> {
    return this.http.get<SanteInternationale>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createSanteInternationale(sante: SanteInternationale): Observable<SanteInternationale> {
    return this.http.post<SanteInternationale>(this.apiUrl, sante, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateSanteInternationale(id: number, sante: SanteInternationale): Observable<SanteInternationale> {
    return this.http.put<SanteInternationale>(`${this.apiUrl}/${id}`, sante, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteSanteInternationale(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}