import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8083/api/reclamations';

  constructor(private http: HttpClient) {}

  downloadPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/pdf`, { responseType: 'blob' });
  }
  
  getReclamations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  createReclamation(reclamation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, reclamation);
  }

  updateReclamation(id: number, reclamation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, reclamation); // ✅ Correction de l'update
  }

  deleteReclamation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }
  
}