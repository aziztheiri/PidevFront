import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accidents } from '../models/accidents.model';

@Injectable({
  providedIn: 'root',
})
export class AccidentsService {
  private apiUrl = 'http://localhost:8083/accidents';

  constructor(private http: HttpClient) {}

  getAllAccidents(): Observable<Accidents[]> {
    return this.http.get<Accidents[]>(this.apiUrl);
  }

  getAccidentById(id: number): Observable<Accidents> {
    return this.http.get<Accidents>(`${this.apiUrl}/${id}`);
  }

  addAccidents(accident: Accidents): Observable<Accidents> {
    return this.http.post<Accidents>(this.apiUrl, accident);
  }

  updateAccident(id: number, accident: Accidents): Observable<Accidents> {
    return this.http.put<Accidents>(`${this.apiUrl}/${id}`, accident);
  }

  deleteAccident(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}