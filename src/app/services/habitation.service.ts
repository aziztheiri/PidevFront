import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitation } from '../models/habitation.model';

@Injectable({
  providedIn: 'root',
})
export class HabitationService {
  private apiUrl = 'http://localhost:8083/habitation';

  constructor(private http: HttpClient) {}

  getAllHabitations(): Observable<Habitation[]> {
    return this.http.get<Habitation[]>(this.apiUrl);
  }

  getHabitationById(id: number): Observable<Habitation> {
    return this.http.get<Habitation>(`${this.apiUrl}/${id}`);
  }

  createHabitation(habitation: Habitation): Observable<Habitation> {
    return this.http.post<Habitation>(this.apiUrl, habitation);
  }

  updateHabitation(id: number, habitation: Habitation): Observable<Habitation> {
    return this.http.put<Habitation>(`${this.apiUrl}/${id}`, habitation);
  }

  deleteHabitation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}