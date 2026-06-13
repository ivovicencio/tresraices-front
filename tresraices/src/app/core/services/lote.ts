import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LOTES, LoteData } from '../../data/lotes.data';

export interface ApiResponse<T> {
  status: '1' | '0';
  msg: string;
  data?: T;
}

export interface PaginatedData<T> {
  [key: string]: T[] | number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class LoteService {
  getLotes(params?: {
    page?: number;
    limit?: number;
    estado?: string;
    search?: string;
  }): Observable<ApiResponse<PaginatedData<LoteData>>> {
    let filtered = [...LOTES];

    if (params?.estado) {
      filtered = filtered.filter(l => l.estado === params.estado);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(l => l.titulo.toLowerCase().includes(q));
    }

    const pageNum = Math.max(1, params?.page || 1);
    const limitNum = Math.min(50, Math.max(1, params?.limit || 10));
    const total = filtered.length;
    const start = (pageNum - 1) * limitNum;
    const propiedades = filtered.slice(start, start + limitNum);

    return of({
      status: '1',
      msg: 'Propiedades obtenidas correctamente',
      data: {
        propiedades,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  }

  getLote(id: number): Observable<ApiResponse<{ propiedad: LoteData }>> {
    const lote = LOTES.find(l => l.id === id);
    if (!lote) {
      return of({ status: '0', msg: 'Propiedad no encontrada' });
    }
    return of({ status: '1', msg: 'Propiedad encontrada', data: { propiedad: lote } });
  }
}
