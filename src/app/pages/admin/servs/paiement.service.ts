// src/app/admin/paiement.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement, PaiementSurPlace, PaiementEnLigne } from './paiement.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private apiUrl = 'http://localhost:8080/paiements';  // URL de ton API Spring Boot

  constructor(private http: HttpClient) { }

  // Récupérer tous les paiements
  getPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.apiUrl);
  }

  // Récupérer les paiements sur place
  getPaiementsSurPlace(): Observable<PaiementSurPlace[]> {
    return this.http.get<PaiementSurPlace[]>(`${this.apiUrl}/surplace`);
  }

  // Récupérer les paiements en ligne
  getPaiementsEnLigne(): Observable<PaiementEnLigne[]> {
    return this.http.get<PaiementEnLigne[]>(`${this.apiUrl}/enligne`);
  }

  // Ajouter un paiement (en ligne ou sur place)
  // src/app/admin/paiement.service.ts
  addPaiement(paiement: Paiement): Observable<Paiement> {
    if ('numeroCarte' in paiement) {  // Vérifier si le paiement est en ligne
      return this.ajouterPaiementEnLigne(paiement);
    } else if ('agence' in paiement) {  // Vérifier si le paiement est sur place
      return this.ajouterPaiementSurPlace(paiement);
    }
    throw new Error('Type de paiement inconnu');
  }




  ajouterPaiementEnLigne(paiement: any): Observable<any> {
    return this.http.post<Paiement>(`${this.apiUrl}/enligne`, paiement);
  }

  ajouterPaiementSurPlace(paiement: any): Observable<any> {
    return this.http.post<Paiement>(`${this.apiUrl}/surplace`, paiement);
  }

  // Mettre à jour un paiement
  updatePaiement(paiement: Paiement): Observable<Paiement> {
    return this.http.put<Paiement>(`${this.apiUrl}/${paiement.id_p}`, paiement);
  }

  // Supprimer un paiement
  deletePaiement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
