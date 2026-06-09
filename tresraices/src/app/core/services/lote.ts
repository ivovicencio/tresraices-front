import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, PaginatedData } from '../../models/api-response.model';
import { Lote } from '../../models/lote.models';

@Injectable({ providedIn: 'root' })
export class LoteService {
  private readonly apiUrl = `${environment.apiUrl}/api/propiedades`;

  constructor(private http: HttpClient) {}

  getLotes(params?: {
    page?: number;
    limit?: number;
    estado?: string;
    search?: string;
    precio_min?: number;
    precio_max?: number;
  }): Observable<ApiResponse<PaginatedData<Lote>>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<ApiResponse<PaginatedData<Lote>>>(this.apiUrl, { params: httpParams });
  }

  getLote(id: number): Observable<ApiResponse<{ propiedad: Lote }>> {
    return this.http.get<ApiResponse<{ propiedad: Lote }>>(`${this.apiUrl}/${id}`);
  }

  createLote(data: Partial<Lote>): Observable<ApiResponse<Lote>> {
    return this.http.post<ApiResponse<Lote>>(this.apiUrl, data);
  }

  updateLote(id: number, data: Partial<Lote>): Observable<ApiResponse<Lote>> {
    return this.http.put<ApiResponse<Lote>>(`${this.apiUrl}/${id}`, data);
  }

  deleteLote(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
  }
}
