import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root',
})
export class DevisService {
  private apiUrl = 'http://localhost:8083/devis';

  constructor(
    private http: HttpClient,
    private ecoleService: EcoleService,
    private voyageService: VoyageService,
    private habitationService: HabitationService,
    private accidentsService: AccidentsService,
    private capitalisationService: CapitalisationService,
    private prevoyanceService: PrevoyanceService,
    private santeInternationaleService: SanteInternationaleService
  ) {}

  getAllDevis(): Observable<Devis[]> {
    return this.http.get<Devis[]>(this.apiUrl);
  }

  getDevisById(id: number): Observable<Devis> {
    return this.http.get<Devis>(`${this.apiUrl}/${id}`);
  }

  createDevis(devis: Devis): Observable<Devis> {
    return this.http.post<Devis>(this.apiUrl, devis);
  }

  updateDevis(id: number, devis: Devis): Observable<Devis> {
    return this.http.put<Devis>(`${this.apiUrl}/${id}`, devis);
  }

  deleteDevis(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateDevisStatus(id: number, statut: string): Observable<Devis> {
    return this.http.patch<Devis>(`${this.apiUrl}/${id}/statut`, null, {
      params: { statut },
    });
  }

  // New method to delete a devis and its related assurance data
  deleteDevisAndRelatedAssurance(devis: Devis): Observable<void> {
    // Check if devis.id and devis.idAssurance are defined
    if (!devis.id || !devis.idAssurance || !devis.typeAssurance) {
      return throwError(() => new Error('Invalid devis data: ID or ID Assurance is missing'));
    }
  
    // Store devis.id in a variable to ensure TypeScript understands it's a number
    const devisId = devis.id;
  
    // Delete the related assurance data first
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
  
    // Delete the devis after the related assurance data is deleted
    return deleteAssuranceObservable.pipe(
      switchMap(() => this.deleteDevis(devisId)), // Use the devisId variable, which is guaranteed to be a number
      catchError((error) => {
        console.error('Error deleting related assurance data:', error);
        return throwError(() => new Error('Failed to delete related assurance data'));
      })
    );
  }

  getDevisByCin(cin: string): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.apiUrl}/cin/${cin}`);
  }

   // Send email
   sendEmail(to: string, subject: string, text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/email/send`, { to, subject, text });
  }
}