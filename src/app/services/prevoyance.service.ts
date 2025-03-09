import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prevoyance } from '../models/prevoyance.model';

@Injectable({
  providedIn: 'root',
})
export class PrevoyanceService {
  private apiUrl = 'http://localhost:8083/prevoyance';

  constructor(private http: HttpClient) {}

  getAllPrevoyances(): Observable<Prevoyance[]> {
    return this.http.get<Prevoyance[]>(this.apiUrl);
  }

  getPrevoyanceById(id: number): Observable<Prevoyance> {
    return this.http.get<Prevoyance>(`${this.apiUrl}/${id}`);
  }

  createPrevoyance(prevoyance: Prevoyance): Observable<Prevoyance> {
    return this.http.post<Prevoyance>(this.apiUrl, prevoyance);
  }

  updatePrevoyance(id: number, prevoyance: Prevoyance): Observable<Prevoyance> {
    return this.http.put<Prevoyance>(`${this.apiUrl}/${id}`, prevoyance);
  }

  deletePrevoyance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}