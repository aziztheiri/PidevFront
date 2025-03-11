import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8090/api/reclamations';

  constructor(private http: HttpClient,private authService:AuthService) {}

  downloadPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/pdf`, { responseType: 'blob', headers: this.authService.getAuthHeaders() });
  }
  
  getReclamations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createReclamation(reclamation: any): Observable<any> {
        const currentUser = this.authService.currentUserSubject.getValue();
        if (!currentUser || !currentUser.cin) {
          return throwError(() => new Error('User is not authenticated or CIN is missing'));
        }
        const cin = currentUser.cin;
    return this.http.post<any>(`${this.apiUrl}/add/${cin}`, reclamation, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateReclamation(id: number, reclamation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, reclamation, {
      headers: this.authService.getAuthHeaders()
    }); // ✅ Correction de l'update
  }

  deleteReclamation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' , headers: this.authService.getAuthHeaders()});
  }
  
}