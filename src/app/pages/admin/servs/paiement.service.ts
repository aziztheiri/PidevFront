// src/app/admin/paiement.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement, PaiementSurPlace, PaiementEnLigne } from './paiement.model';
import emailjs from 'emailjs-com';
import { Agency } from './agency.model';
@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private apiUrl = 'http://localhost:8080/paiements';  // URL de ton API Spring Boot

  constructor(private http: HttpClient) { }


  getPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.apiUrl);
  }

  getCreneauxDisponibles(agence: string, date: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/surplace/creneaux-disponibles`, {
      params: { agence, date }
    });
  }


  getPaiementsSurPlace(): Observable<PaiementSurPlace[]> {
    return this.http.get<PaiementSurPlace[]>(`${this.apiUrl}/surplace`);
  }


  getPaiementsEnLigne(): Observable<PaiementEnLigne[]> {
    return this.http.get<PaiementEnLigne[]>(`${this.apiUrl}/enligne`);
  }


  // src/app/admin/paiement.service.ts
  addPaiement(paiement: Paiement): Observable<Paiement> {
    if ('agence' in paiement) {  // Vérifier si le paiement est en ligne
      return this.ajouterPaiementSurPlace(paiement);
    } else  {  // Vérifier si le paiement est sur place
      return this.ajouterPaiementEnLigne(paiement);
    }
    throw new Error('Type de paiement inconnu');
  }


  addPaiement1(paiement: Paiement): Observable<Paiement> {
     // Vérifier si le paiement est en ligne
      return this.ajouterPaiementSurPlace(paiement);

    throw new Error('no post');
  }


  getAgencies(): Observable<Agency[]> {
    return this.http.get<Agency[]>('http://localhost:8080/api/agencies');
  }


  ajouterPaiementEnLigne(paiement: Paiement): Observable<Paiement> {
    console.log('Ajout paiement en ligne - Données envoyées:', paiement);
    return this.http.post<Paiement>(`${this.apiUrl}/enligne`, paiement);
  }

  ajouterPaiementSurPlace(paiement: Paiement): Observable<Paiement> {
    console.log('Ajout paiement sur place - Données envoyées:', paiement);
    return this.http.post<Paiement>(`${this.apiUrl}/surplace`, paiement);
  }

  updatePaiement(paiement: Paiement): Observable<Paiement> {
    return this.http.put<Paiement>(`${this.apiUrl}/${paiement.id_p}`, paiement);
  }


  deletePaiement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  sendEmailConfirmationEnLigne(emailData: any): void {
    emailjs.send('pidev_mail_api', 'template_en_ligne', emailData, 'ug5piI6Wl-1fLZVaV')
        .then((response) => {
          console.log('E-mail de confirmation pour paiement en ligne envoyé avec succès', response);
        }, (error) => {
          console.error('Erreur lors de l\'envoi de l\'email pour paiement en ligne', error);
        });
  }


  sendEmailConfirmationSurPlace(emailData: any): void {
    emailjs.send('pidev_mail_api', 'template_sur_place', emailData, 'ug5piI6Wl-1fLZVaV')
        .then((response) => {
          console.log('E-mail de confirmation pour paiement sur place envoyé avec succès', response);
        }, (error) => {
          console.error('Erreur lors de l\'envoi de l\'email pour paiement sur place', error);
        });
  }

  getClientToken(): Observable<string> {
    return this.http.get<string>(`http://localhost:8080/paiements/enligne/token`);
  }

}
