import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/api/auth`;
  private readonly tokenKey = 'tresraices_token';

  isLoggedIn = signal(this.hasValidToken());

  constructor(private http: HttpClient) {}

  register(data: { username: string; nombre: string; apellido: string; telefono: string; email: string; password: string }): Observable<ApiResponse<{ token: string }>> {
    return this.http.post<ApiResponse<{ token: string }>>(`${this.apiUrl}/register`, data).pipe(
      tap((res: any) => {
        if (res.status === '1' && res.token) {
          this.saveToken(res.token);
        }
      })
    );
  }

  login(data: { email: string; password: string }): Observable<ApiResponse<{ token: string }>> {
    return this.http.post<ApiResponse<{ token: string }>>(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        if (res.status === '1' && res.token) {
          this.saveToken(res.token);
        }
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    this.isLoggedIn.set(false);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  getUser(): { id: number; username: string } | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      this.logout();
      return false;
    }
  }

  private saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
    this.isLoggedIn.set(true);
  }
}
