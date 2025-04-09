import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Performance } from '../models/performance.model';
import { AgencePerformance } from '../models/agence-performance.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private baseUrl = 'http://localhost:8090/performance';
  private statsApiUrl = 'http://localhost:8090/statistics';

  constructor(private http: HttpClient,private authService:AuthService) { }

  getAllPerformances(): Observable<Performance[]> {
    return this.http.get<Performance[]>(`${this.baseUrl}/all`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getPerformanceById(id: number): Observable<Performance> {
    return this.http.get<Performance>(`${this.baseUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  createPerformance(performance: any): Observable<Performance> {
    // If agence is provided as an ID (number), convert it to an object with idAgence property
    if (performance.agence && typeof performance.agence === 'number') {
      performance = {
        ...performance,
        agence: {
          idAgence: performance.agence
        }
      };
    }
    return this.http.post<Performance>(`${this.baseUrl}/add`, performance, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updatePerformance(id: number, performance: any): Observable<Performance> {
    // If agence is provided as an ID (number), convert it to an object with idAgence property
    if (performance.agence && typeof performance.agence === 'number') {
      performance = {
        ...performance,
        agence: {
          idAgence: performance.agence
        }
      };
    }
    return this.http.put<Performance>(`${this.baseUrl}/update/${id}`, performance, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deletePerformance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getPerformancesByAgence(agenceId: number): Observable<Performance[]> {
    return this.http.get<Performance[]>(`${this.baseUrl}/byAgence/${agenceId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getPerformancesByDateRange(startDate: string, endDate: string): Observable<Performance[]> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<Performance[]>(`${this.baseUrl}/byDateRange`, { params , 
      headers: this.authService.getAuthHeaders()
    });
  }

  exportPerformancesToExcel(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/exportExcel`, { responseType: 'blob', 
      headers: this.authService.getAuthHeaders()
     });
  }

  exportPerformancesToPdf(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/exportPdf`, { responseType: 'blob' , 
      headers: this.authService.getAuthHeaders()
    });
  }

  generateStatistics(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/statistics`, { responseType: 'blob' , 
      headers: this.authService.getAuthHeaders()
    });
  }
  
  getTopAgencesByRevenue(limit: number = 5, startDate: string, endDate: string): Observable<AgencePerformance[]> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('startDate', startDate)
      .set('endDate', endDate);
    
    return this.http.get<AgencePerformance[]>(
      `${this.statsApiUrl}/top-revenue`, 
      { params , 
        headers: this.authService.getAuthHeaders()
       }
    );
  }
  
  getTopAgencesByContracts(limit: number = 5, startDate: string, endDate: string): Observable<AgencePerformance[]> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('startDate', startDate)
      .set('endDate', endDate);
    
    return this.http.get<AgencePerformance[]>(
      `${this.statsApiUrl}/top-contracts`, 
      { params , 
        headers: this.authService.getAuthHeaders()
       }
    );
  }
  
  getAgencePerformance(agenceId: number, startDate: string, endDate: string): Observable<AgencePerformance> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    
    return this.http.get<AgencePerformance>(
      `${this.statsApiUrl}/agency-performance/${agenceId}`, 
      { params , 
        headers: this.authService.getAuthHeaders()
       }
    );
  }

  exportStatisticsToPdf(limit: number, startDate: string, endDate: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/statistics`, {
      responseType: 'blob',
      params: {
        limit: limit.toString(),
        startDate,
        endDate
      }
      , 
        headers: this.authService.getAuthHeaders()
      
    });
  }

  exportToExcel(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/exportExcel`, {
      responseType: 'blob', 
        headers: this.authService.getAuthHeaders()
      
    });
  }

  exportToPdf(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/exportPdf`, {
      responseType: 'blob', 
        headers: this.authService.getAuthHeaders()
      
    });
  }
}
