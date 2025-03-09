import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Devis } from '../models/devis.model';
import { EcoleService } from './ecole.service';
import { VoyageService } from './voyage.service';
import { HabitationService } from './habitation.service';
import { AccidentsService } from './accidents.service';
import { CapitalisationService } from './capitalisation.service';
import { PrevoyanceService } from './prevoyance.service';
import { SanteInternationaleService } from './sante-internationale.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DevisService {
  private apiUrl = 'http://localhost:8090/devis';
 
  constructor(
    private http: HttpClient,
    private ecoleService: EcoleService,
    private voyageService: VoyageService,
    private habitationService: HabitationService,
    private accidentsService: AccidentsService,
    private capitalisationService: CapitalisationService,
    private prevoyanceService: PrevoyanceService,
    private santeInternationaleService: SanteInternationaleService,
    private authService:AuthService
  ) {}

  getAllDevis(): Observable<Devis[]> {
    return this.http.get<Devis[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getDevisById(id: number): Observable<Devis> {
    return this.http.get<Devis>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createDevis(devis: Devis): Observable<Devis> {
    const currentUser = this.authService.currentUserSubject.getValue();
    if (!currentUser || !currentUser.cin) {
      return throwError(() => new Error('User is not authenticated or CIN is missing'));
    }
    const cin = currentUser.cin;

    const url = `${this.apiUrl}/${cin}`;

    return this.http.post<Devis>(url, devis, { headers: this.authService.getAuthHeaders() });
  }
  updateDevis(id: number, devis: Devis): Observable<Devis> {
    return this.http.put<Devis>(`${this.apiUrl}/${id}`, devis, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteDevis(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateDevisStatus(id: number, statut: string): Observable<Devis> {
    return this.http.patch<Devis>(`${this.apiUrl}/${id}/statut`, null, {
      params: { statut },
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteDevisAndRelatedAssurance(devis: Devis): Observable<void> {
    if (!devis.id || !devis.idAssurance || !devis.typeAssurance) {
      return throwError(() => new Error('Invalid devis data: ID or ID Assurance is missing'));
    }

    const devisId = devis.id;
    let deleteAssuranceObservable: Observable<void>;

    switch (devis.typeAssurance) {
      case 'ECOLE':
        deleteAssuranceObservable = this.ecoleService.deleteEcole(devis.idAssurance);
        break;
      case 'VOYAGE':
        deleteAssuranceObservable = this.voyageService.deleteVoyage(devis.idAssurance);
        break;
      case 'HABITATION':
        deleteAssuranceObservable = this.habitationService.deleteHabitation(devis.idAssurance);
        break;
      case 'ACCIDENTS':
        deleteAssuranceObservable = this.accidentsService.deleteAccident(devis.idAssurance);
        break;
      case 'CAPITALISATION':
        deleteAssuranceObservable = this.capitalisationService.deleteCapitalisation(devis.idAssurance);
        break;
      case 'PREVOYANCE':
        deleteAssuranceObservable = this.prevoyanceService.deletePrevoyance(devis.idAssurance);
        break;
      case 'SANTE_INTERNATIONALE':
        deleteAssuranceObservable = this.santeInternationaleService.deleteSanteInternationale(devis.idAssurance);
        break;
      default:
        return throwError(() => new Error('Unknown assurance type'));
    }

    return deleteAssuranceObservable.pipe(
      switchMap(() => this.deleteDevis(devisId)),
      catchError((error) => {
        console.error('Error deleting related assurance data:', error);
        return throwError(() => new Error('Failed to delete related assurance data'));
      })
    );
  }

  getDevisByCin(cin: string): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.apiUrl}/cin/${cin}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  sendEmail(to: string, subject: string, text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/email/send`, { to, subject, text }, {
      headers: this.authService.getAuthHeaders()
    });
  }
}