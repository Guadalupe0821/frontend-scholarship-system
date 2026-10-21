export interface MenuItem {
  title: string;
  icon: string;
  route: string;
  sections?: string[];
  permissions?: string;
  subItems?: MenuItem[];
  roles?: string[];
}

export const MenuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard',
  },
  {
    title: 'Cafeterías',
    icon: 'store',
    route: '/tenants',
    roles: ['Superadmin'],
  },
  {
    title: 'Usuarios',
    icon: 'people',
    route: '/users',
    roles: ['Superadmin', 'Admin'],
  },
];
