import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, PaginatedData } from '../../models/api-response.model';
import { Lead, CreateLeadRequest } from '../../models/lead.model';

@Injectable({ providedIn: 'root' })
export class LeadService {
  private readonly apiUrl = `${environment.apiUrl}/api/leads`;

  constructor(private http: HttpClient) {}

  createLead(data: CreateLeadRequest): Observable<ApiResponse<{ id: number }>> {
    return this.http.post<ApiResponse<{ id: number }>>(this.apiUrl, data);
  }

  getLeads(params?: {
    page?: number;
    limit?: number;
    estado?: string;
  }): Observable<ApiResponse<PaginatedData<Lead>>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<ApiResponse<PaginatedData<Lead>>>(this.apiUrl, { params: httpParams });
  }

  updateLeadStatus(id: number, estado: string): Observable<ApiResponse<Lead>> {
    return this.http.put<ApiResponse<Lead>>(`${this.apiUrl}/${id}`, { estado });
  }
}
