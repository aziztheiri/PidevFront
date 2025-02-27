import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Capitalisation } from '../models/capitalisation.model';

@Injectable({
  providedIn: 'root',
})
export class CapitalisationService {
  private apiUrl = 'http://localhost:8083/capitalisation';

  constructor(private http: HttpClient) {}

  getAllCapitalisations(): Observable<Capitalisation[]> {
    return this.http.get<Capitalisation[]>(this.apiUrl);
  }

  getCapitalisationById(id: number): Observable<Capitalisation> {
    return this.http.get<Capitalisation>(`${this.apiUrl}/${id}`);
  }

  createCapitalisation(capitalisation: Capitalisation): Observable<Capitalisation> {
    return this.http.post<Capitalisation>(this.apiUrl, capitalisation);
  }

  updateCapitalisation(id: number, capitalisation: Capitalisation): Observable<Capitalisation> {
    return this.http.put<Capitalisation>(`${this.apiUrl}/${id}`, capitalisation);
  }

  deleteCapitalisation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}