import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ecole } from '../models/ecole.model';

@Injectable({
  providedIn: 'root',
})
export class EcoleService {
  private apiUrl = 'http://localhost:8083/ecole';

  constructor(private http: HttpClient) {}

  getAllEcoles(): Observable<Ecole[]> {
    return this.http.get<Ecole[]>(this.apiUrl);
  }

  getEcoleById(id: number): Observable<Ecole> {
    return this.http.get<Ecole>(`${this.apiUrl}/${id}`);
  }

  createEcole(ecole: Ecole): Observable<Ecole> {
    return this.http.post<Ecole>(this.apiUrl, ecole);
  }

  updateEcole(id: number, ecole: Ecole): Observable<Ecole> {
    return this.http.put<Ecole>(`${this.apiUrl}/${id}`, ecole);
  }

  deleteEcole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}