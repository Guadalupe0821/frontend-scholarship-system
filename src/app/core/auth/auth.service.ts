import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AuthUser, LoginRequest, LoginResponse, Role } from './auth.model';
import { AUTH_MOCK_USERS } from '../mock/auth.mock';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly tokenKey = 'scholarship_auth_token';
  private readonly userKey = 'scholarship_auth_user';

  private readonly _isAuthenticated = signal<boolean>(this.hasToken());
  private readonly _currentUser = signal<AuthUser | null>(this.loadUserFromStorage());

  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly currentUser = this._currentUser.asReadonly();
  readonly roles = computed<Role[]>(() => this._currentUser()?.roles ?? []);

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  hasRole(role: Role): boolean {
    return this.roles().includes(role);
  }

  hasAnyRole(roles: Role[] | undefined): boolean {
    if (!roles || roles.length === 0) return true;
    const userRoles = this.roles();
    return roles.some((role) => userRoles.includes(role));
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    const user = AUTH_MOCK_USERS.find(
      (u) =>
        (u.username === request.usernameOrEmail || u.email === request.usernameOrEmail) &&
        u.password === request.password,
    );

    if (!user) {
      return throwError(() => new Error('Credenciales inválidas'));
    }

    const response: LoginResponse = {
      accessToken: this.generateMockToken(user),
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        roles: user.roles,
        tenantId: user.tenantId,
        tenantName: user.tenantName,
      },
    };

    return of(response).pipe(
      delay(600),
      tap((res) => {
        sessionStorage.setItem(this.tokenKey, res.accessToken);
        sessionStorage.setItem(this.userKey, JSON.stringify(res.user));
        this._currentUser.set(res.user);
        this._isAuthenticated.set(true);
      }),
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    this._currentUser.set(null);
    this._isAuthenticated.set(false);
    void this.router.navigate(['/login']);
  }

  private loadUserFromStorage(): AuthUser | null {
    const raw = sessionStorage.getItem(this.userKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  private generateMockToken(user: AuthUser): string {
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
      tenantId: user.tenantId,
      tenantName: user.tenantName,
      exp: Math.floor(Date.now() / 1000) + 3600,
    };
    return btoa(JSON.stringify(payload));
  }
}
