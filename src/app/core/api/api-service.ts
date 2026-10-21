import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { QueryParams, toHttpParams } from '@mean/helpers';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_VERSION } from './api-path.model';
import { ApiResponse } from './api-response.model';

@Service()
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiURL}${API_VERSION}`;

  get<T>(path: string, params?: QueryParams): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(this.url(path), {
      params: toHttpParams(params ?? {}),
    });
  }

  post<T>(path: string, body: unknown): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(this.url(path), body);
  }

  put<T>(path: string, body: unknown): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(this.url(path), body);
  }

  patch<T>(path: string, body: unknown): Observable<ApiResponse<T>> {
    return this.http.patch<ApiResponse<T>>(this.url(path), body);
  }

  delete<T>(path: string): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(this.url(path));
  }

  private url(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}
