import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  private apiUrl = 'http://localhost:8090/api/reponses';

  constructor(private http: HttpClient,private authService:AuthService) {}

  createReponse(reclamationId: number, reponseText: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${reclamationId}`, reponseText, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getReponseByReclamation(reclamationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${reclamationId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteReponse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateReponse(reponseId: number, texte: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${reponseId}`, texte, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createOrUpdateReponse(reclamationId: number, reponseText: string): Observable<any> {
    // On envoie simplement la chaîne reponseText au backend
    // Le backend décidera s'il faut créer ou mettre à jour.
    return this.http.post<any>(`${this.apiUrl}/${reclamationId}`, reponseText, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
