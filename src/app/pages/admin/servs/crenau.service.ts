import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreneauService {
  constructor(private http: HttpClient) {}

  getCreneauxDisponibles(agence: string, date: string): Observable<string[]> {
    return this.http.get<string[]>(`/api/creneaux/disponibles`, {
      params: { agence, date }
    });
  }
}