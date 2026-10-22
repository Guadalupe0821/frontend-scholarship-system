import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then((m) => m.Login),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./core/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./scholarship-system/dashboard/dashboard').then((m) => m.Dashboard),
        data: {
          breadcrumb: 'Dashboard',
        },
      },
      {
        path: 'tenants',
        loadComponent: () =>
          import('./tenants/tenants-list/tenants-list').then((m) => m.TenantsList),
        canActivate: [authGuard],
        data: {
          roles: ['Superadmin'],
          breadcrumb: 'Cafeterías',
        },
      },
      {
        path: 'users',
        loadComponent: () => import('./users/users-list/users-list').then((m) => m.UsersList),
        canActivate: [authGuard],
        data: {
          roles: ['Superadmin', 'Admin'],
          breadcrumb: 'Usuarios',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
