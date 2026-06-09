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
      tap((res) => {
        if (res.status === '1' && res.data?.token) {
          this.saveToken(res.data.token);
        }
      })
    );
  }

  login(data: { email: string; password: string }): Observable<ApiResponse<{ token: string }>> {
    return this.http.post<ApiResponse<{ token: string }>>(`${this.apiUrl}/login`, data).pipe(
      tap((res) => {
        if (res.status === '1' && res.data?.token) {
          this.saveToken(res.data.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
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
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedIn.set(true);
  }
}
