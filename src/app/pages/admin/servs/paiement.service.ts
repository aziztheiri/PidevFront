// src/app/admin/paiement.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { Paiement, PaiementSurPlace, PaiementEnLigne } from './paiement.model';
import emailjs from 'emailjs-com';
import { AuthService } from 'src/app/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private apiUrl = 'http://localhost:8090/paiements';  // URL de ton API Spring Boot

  constructor(private http: HttpClient, private authService:AuthService) { }
 

  getPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.apiUrl);
  }


  getPaiementsSurPlace(): Observable<PaiementSurPlace[]> {
    return this.http.get<PaiementSurPlace[]>(`${this.apiUrl}/surplace`, {
      headers: this.authService.getAuthHeaders()
    });
  }


  getPaiementsEnLigne(): Observable<PaiementEnLigne[]> {
    return this.http.get<PaiementEnLigne[]>(`${this.apiUrl}/enligne`, {
      headers: this.authService.getAuthHeaders()
    });
  }


  // src/app/admin/paiement.service.ts
  addPaiement(paiement: Paiement): Observable<Paiement> {
    if ('agence' in paiement) {  // Vérifier si le paiement est en ligne
      return this.ajouterPaiementSurPlace(paiement);
    } else if ('numeroCarte' in paiement) {  // Vérifier si le paiement est sur place
      return this.ajouterPaiementEnLigne(paiement);
    }
    throw new Error('Type de paiement inconnu');
  }

  ajouterPaiementEnLigne(paiement: Paiement): Observable<Paiement> {
    const currentUser = this.authService.currentUserSubject.getValue();
        if (!currentUser || !currentUser.cin) {
          return throwError(() => new Error('User is not authenticated or CIN is missing'));
        }
        const cin = currentUser.cin;
    return this.http.post<Paiement>(`${this.apiUrl}/enligne/${cin}`, paiement, {
      headers: this.authService.getAuthHeaders()
    });
}


  ajouterPaiementSurPlace(paiement: Paiement): Observable<Paiement> {
    const currentUser = this.authService.currentUserSubject.getValue();
        if (!currentUser || !currentUser.cin) {
          return throwError(() => new Error('User is not authenticated or CIN is missing'));
        }
        const cin = currentUser.cin;
    return this.http.post<Paiement>(`${this.apiUrl}/surplace/${cin}`, paiement, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updatePaiement(paiement: Paiement): Observable<Paiement> {
    return this.http.put<Paiement>(`${this.apiUrl}/${paiement.id_p}`, paiement, {
      headers: this.authService.getAuthHeaders()
    });
  }


  deletePaiement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
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

}
