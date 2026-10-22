import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { PageHeader, Table, TableColumn, TableAction, ToastService } from '@mean/shared';
import { AuthService, Role } from '@mean/auth';
import { USERS_MOCK, MockUser } from '../../core/mock/users.mock';
import { TENANTS_MOCK } from '../../core/mock/tenants.mock';

@Component({
  selector: 'app-users-list',
  imports: [
    PageHeader,
    Table,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList implements OnInit {
  private readonly toastService = inject(ToastService);
  private readonly authService = inject(AuthService);

  readonly loading = signal(false);
  readonly users = signal<MockUser[]>([]);
  readonly tenants = TENANTS_MOCK;

  readonly selectedTenant = signal<string>('all');
  readonly selectedRole = signal<string>('all');
  readonly selectedStatus = signal<string>('all');

  readonly isSuperadmin = computed(() => this.authService.hasRole('Superadmin'));
  readonly isAdmin = computed(() => this.authService.hasRole('Admin'));

  readonly filteredUsers = computed(() => {
    let result = this.users();
    if (this.selectedTenant() !== 'all') {
      result = result.filter((u) => u.tenantId === this.selectedTenant());
    }
    if (this.selectedRole() !== 'all') {
      result = result.filter((u) => u.role === (this.selectedRole() as Role));
    }
    if (this.selectedStatus() !== 'all') {
      const active = this.selectedStatus() === 'active';
      result = result.filter((u) => u.active === active);
    }
    return result;
  });

  readonly columns: TableColumn<MockUser>[] = [
    { key: 'username', label: 'Usuario/Username', type: 'text', bold: true },
    { key: 'fullName', label: 'Nombre Completo', type: 'text' },
    { key: 'role', label: 'Rol', type: 'status' },
    { key: 'tenantName', label: 'Cafetería asignada', type: 'text' },
    { key: 'active', label: 'Estado', type: 'status' },
  ];

  readonly actions: TableAction<MockUser>[] = [
    {
      icon: 'edit',
      tooltip: 'Editar',
      color: 'primary',
      action: (row) => this.editUser(row),
    },
  ];

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.users.set(USERS_MOCK);
      this.loading.set(false);
    }, 400);
  }

  protected newUser(): void {
    this.toastService.info(
      'Modo mock',
      'Funcionalidad de alta de usuario (TODO: conectar con backend)',
    );
  }

  private editUser(user: MockUser): void {
    this.toastService.info(
      'Modo mock',
      `Editar usuario: ${user.fullName} (TODO: conectar con backend)`,
    );
  }
}
