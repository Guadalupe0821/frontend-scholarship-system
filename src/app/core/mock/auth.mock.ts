import { Role } from '../auth/auth.model';

export interface MockAuthUser {
  id: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  roles: Role[];
  tenantId?: string;
  tenantName?: string;
}

export const AUTH_MOCK_USERS: MockAuthUser[] = [
  {
    id: '1',
    username: 'superadmin',
    email: 'superadmin@beca.com',
    password: 'admin123',
    fullName: 'Super Administrador',
    roles: ['Superadmin'],
  },
  {
    id: '2',
    username: 'admin_caf1',
    email: 'admin.caf1@beca.com',
    password: 'admin123',
    fullName: 'Admin Cafetería Central',
    roles: ['Admin'],
    tenantId: '1',
    tenantName: 'Cafetería Central',
  },
  {
    id: '3',
    username: 'checker_caf1',
    email: 'checker.caf1@beca.com',
    password: 'checker123',
    fullName: 'Revisor Cafetería Central',
    roles: ['Checker'],
    tenantId: '1',
    tenantName: 'Cafetería Central',
  },
];
