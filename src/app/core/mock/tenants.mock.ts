export interface Tenant {
  id: string;
  name: string;
  code: string;
  active: boolean;
  createdAt: string;
}

export const TENANTS_MOCK: Tenant[] = [
  {
    id: '1',
    name: 'Cafetería Central',
    code: 'CAF-001',
    active: true,
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Cafetería Norte',
    code: 'CAF-002',
    active: true,
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: '3',
    name: 'Cafetería Sur',
    code: 'CAF-003',
    active: false,
    createdAt: '2026-03-05T10:00:00Z',
  },
];
