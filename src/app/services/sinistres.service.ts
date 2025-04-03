import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { Sinistre } from '../models/sinistre';
import { Observable,throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SinistresService {
  private apiUrl = 'http://localhost:8090/sinistres';

  constructor(private http: HttpClient,private authService:AuthService) {}

  getSinistres(): Observable<Sinistre[]> {
    return this.http.get<Sinistre[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getSinistreById(id: number): Observable<Sinistre> {
    return this.http.get<Sinistre>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createSinistre(sinistre: Sinistre): Observable<Sinistre> {
     const currentUser = this.authService.currentUserSubject.getValue();
            if (!currentUser || !currentUser.cin) {
              return throwError(() => new Error('User is not authenticated or CIN is missing'));
            }
            const cin = currentUser.cin;
    return this.http.post<Sinistre>(`${this.apiUrl}/addsinistre/${cin}`, sinistre, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateSinistre(id: number, sinistre: Sinistre): Observable<Sinistre> {
    return this.http.put<Sinistre>(`${this.apiUrl}/updatesinistre/${id}`, sinistre, {
      headers: this.authService.getAuthHeaders()
    })

  }

  deleteSinistre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletesinistre/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Ajouter un document au sinistre
  addDocumentToSinistre(sinistreId: number, document: FormData): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/${sinistreId}/add-document`, document, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Récupérer les documents d'un sinistre
  getDocumentsForSinistre(sinistreId: number): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/${sinistreId}/documents`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Supprimer un document d'un sinistre
  deleteDocumentFromSinistre(sinistreId: number, documentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sinistreId}/delete-document/${documentId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
