import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agence } from '../models/agences.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AgenceService {
  private apiUrl = 'http://localhost:8090/agences'; // L'URL de l'API Spring Boot (configurée via le proxy)
  private statsApiUrl = 'http://localhost:8090/statistics';

  constructor(private http: HttpClient,private authService:AuthService) {}

  /**
   * Créer une nouvelle agence.
   * @param agence - Les données de l'agence à créer.
   * @returns Un Observable contenant l'agence créée.
   */
  createAgence(agence: Agence): Observable<Agence> {
    return this.http.post<Agence>(this.apiUrl, agence, {
      headers: this.authService.getAuthHeaders()
    });
  }

  /**
   * Récupérer la liste de toutes les agences.
   * @returns Un Observable contenant un tableau d'agences.
   */
  getAllAgences(search?: string, ville?: string): Observable<Agence[]> {
    let params = new HttpParams();
    
    if (search) {
      params = params.set('search', search);
    }
    
    if (ville) {
      params = params.set('ville', ville);
    }
    
    return this.http.get<Agence[]>(this.apiUrl, { params,
      headers: this.authService.getAuthHeaders()
     });
  }

  /**
   * Récupérer la liste des villes uniques pour le filtre.
   */
  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/cities`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  /**
   * Récupérer une agence par son ID.
   * @param id - L'ID de l'agence à récupérer.
   * @returns Un Observable contenant l'agence correspondante.
   */
  getAgenceById(id: number): Observable<Agence> {
    return this.http.get<Agence>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  /**
   * Mettre à jour une agence existante.
   * @param id - L'ID de l'agence à mettre à jour.
   * @param agence - Les nouvelles données de l'agence.
   * @returns Un Observable contenant l'agence mise à jour.
   */
  updateAgence(id: number, agence: Agence): Observable<Agence> {
    return this.http.put<Agence>(`${this.apiUrl}/${id}`, agence, {
      headers: this.authService.getAuthHeaders()
    });
  }

  /**
   * Supprimer une agence par son ID.
   * @param id - L'ID de l'agence à supprimer.
   * @returns Un Observable vide.
   */
  deleteAgence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  /**
   * Exporter les agences vers Excel.
   * @returns Un Observable contenant un Blob du fichier Excel.
   */
  exportToExcel(): Observable<Blob> {
    return this.http.get(`${this.statsApiUrl}/export/excel`, { responseType: 'blob' , 
      headers: this.authService.getAuthHeaders()
    });
  }
}
