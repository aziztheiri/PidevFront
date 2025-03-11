import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  private apiUrl = 'http://localhost:8083/api/reponses';

  constructor(private http: HttpClient) {}

  createReponse(reclamationId: number, reponseText: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${reclamationId}`, reponseText);
  }

  getReponseByReclamation(reclamationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${reclamationId}`);
  }

  deleteReponse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateReponse(reponseId: number, texte: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${reponseId}`, texte);
  }

  createOrUpdateReponse(reclamationId: number, reponseText: string): Observable<any> {
    // On envoie simplement la chaîne reponseText au backend
    // Le backend décidera s'il faut créer ou mettre à jour.
    return this.http.post<any>(`${this.apiUrl}/${reclamationId}`, reponseText);
  }
}
