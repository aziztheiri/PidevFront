import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Capitalisation } from '../models/capitalisation.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CapitalisationService {
  private apiUrl = 'http://localhost:8090/capitalisation';

  constructor(private http: HttpClient,private authService:AuthService){}

  getAllCapitalisations(): Observable<Capitalisation[]> {
    return this.http.get<Capitalisation[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }
  
  getCapitalisationById(id: number): Observable<Capitalisation> {
    return this.http.get<Capitalisation>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
  
  createCapitalisation(capitalisation: Capitalisation): Observable<Capitalisation> {
    return this.http.post<Capitalisation>(this.apiUrl, capitalisation, {
      headers: this.authService.getAuthHeaders()
    });
  }
  
  updateCapitalisation(id: number, capitalisation: Capitalisation): Observable<Capitalisation> {
    return this.http.put<Capitalisation>(`${this.apiUrl}/${id}`, capitalisation, {
      headers: this.authService.getAuthHeaders()
    });
  }
  
  deleteCapitalisation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}