export type Role = 'Superadmin' | 'Admin' | 'Checker';

export interface AuthUser {
  id: string;
  username: string;
  fullName: string;
  email?: string;
  roles: Role[];
  tenantId?: string;
  tenantName?: string;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: AuthUser;
}

export interface JwtPayload {
  sub?: string;
  username?: string;
  roles?: Role[] | string[];
  tenantId?: string;
  tenantName?: string;
  exp?: number;
  [key: string]: any;
}
