import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Sinistre } from "src/app/models/sinistre";

@Injectable({ providedIn: 'root' })
export class SinistreService {
  private apiUrl = 'http://localhost:8089/pidev/api/sinistres';

  constructor(private http: HttpClient) {}

  getSinistres(): Observable<Sinistre[]> {
    return this.http.get<Sinistre[]>(this.apiUrl);
  }

  getSinistreById(id: number): Observable<Sinistre> {
    return this.http.get<Sinistre>(`${this.apiUrl}/${id}`);
  }

  createSinistre(sinistre: Sinistre): Observable<Sinistre> {
    return this.http.post<Sinistre>(`${this.apiUrl}/addsinistre`, sinistre);
  }

  updateSinistre(id: number, sinistre: Sinistre): Observable<Sinistre> {
    return this.http.put<Sinistre>(`${this.apiUrl}/updatesinistre/${id}`, sinistre);
  }

  deleteSinistre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletesinistre/${id}`);
  }

  // Ajouter un document au sinistre
  addDocumentToSinistre(sinistreId: number, document: FormData): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/${sinistreId}/add-document`, document);
  }

  // Récupérer les documents d'un sinistre
  getDocumentsForSinistre(sinistreId: number): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/${sinistreId}/documents`);
  }

  // Supprimer un document d'un sinistre
  deleteDocumentFromSinistre(sinistreId: number, documentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sinistreId}/delete-document/${documentId}`);
  }
}
