import { Role } from '../auth/auth.model';

export interface MockUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: Role;
  tenantId?: string;
  tenantName?: string;
  active: boolean;
  createdAt: string;
}

export const USERS_MOCK: MockUser[] = [
  {
    id: '1',
    username: 'superadmin',
    email: 'superadmin@beca.com',
    fullName: 'Super Administrador',
    role: 'Superadmin',
    active: true,
    createdAt: '2026-01-01T10:00:00Z',
  },
  {
    id: '2',
    username: 'admin_caf1',
    email: 'admin.caf1@beca.com',
    fullName: 'Admin Cafetería Central',
    role: 'Admin',
    tenantId: '1',
    tenantName: 'Cafetería Central',
    active: true,
    createdAt: '2026-01-20T10:00:00Z',
  },
  {
    id: '3',
    username: 'checker_caf1',
    email: 'checker.caf1@beca.com',
    fullName: 'Revisor Cafetería Central',
    role: 'Checker',
    tenantId: '1',
    tenantName: 'Cafetería Central',
    active: true,
    createdAt: '2026-02-01T10:00:00Z',
  },
];
