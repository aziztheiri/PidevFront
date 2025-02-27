import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Garanties } from '../models/garanties.model';

@Injectable({
  providedIn: 'root',
})
export class GarantiesService {
  private apiUrl = 'http://localhost:8083/garanties';

  constructor(private http: HttpClient) {}

  getAllGaranties(): Observable<Garanties[]> {
    return this.http.get<Garanties[]>(this.apiUrl);
  }

  getGarantieById(id: number): Observable<Garanties> {
    return this.http.get<Garanties>(`${this.apiUrl}/${id}`);
  }

  createGarantie(garantie: Garanties): Observable<Garanties> {
    return this.http.post<Garanties>(this.apiUrl, garantie);
  }

  updateGarantie(id: number, garantie: Garanties): Observable<Garanties> {
    return this.http.put<Garanties>(`${this.apiUrl}/${id}`, garantie);
  }

  deleteGarantie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}