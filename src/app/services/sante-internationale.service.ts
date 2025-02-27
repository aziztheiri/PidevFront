import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SanteInternationale } from '../models/santeinternationale.model';

@Injectable({
  providedIn: 'root',
})
export class SanteInternationaleService {
  private apiUrl = 'http://localhost:8083/sante-internationale';

  constructor(private http: HttpClient) {}

  getAllSanteInternationales(): Observable<SanteInternationale[]> {
    return this.http.get<SanteInternationale[]>(this.apiUrl);
  }

  getSanteInternationaleById(id: number): Observable<SanteInternationale> {
    return this.http.get<SanteInternationale>(`${this.apiUrl}/${id}`);
  }

  createSanteInternationale(sante: SanteInternationale): Observable<SanteInternationale> {
    return this.http.post<SanteInternationale>(this.apiUrl, sante);
  }

  updateSanteInternationale(id: number, sante: SanteInternationale): Observable<SanteInternationale> {
    return this.http.put<SanteInternationale>(`${this.apiUrl}/${id}`, sante);
  }

  deleteSanteInternationale(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}