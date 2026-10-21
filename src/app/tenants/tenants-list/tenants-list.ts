import { Component, inject, signal, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PageHeader, Table, TableColumn, TableAction, ToastService } from '@mean/shared';
import { TENANTS_MOCK, Tenant } from '../../core/mock/tenants.mock';

@Component({
  selector: 'app-tenants-list',
  imports: [PageHeader, Table, MatButtonModule, MatIconModule],
  templateUrl: './tenants-list.html',
  styleUrl: './tenants-list.scss',
})
export class TenantsList implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly toastService = inject(ToastService);

  readonly loading = signal(false);
  readonly tenants = signal<Tenant[]>([]);

  readonly columns: TableColumn<Tenant>[] = [
    { key: 'name', label: 'Nombre Comercial', type: 'text', bold: true },
    { key: 'code', label: 'Código', type: 'text' },
    { key: 'active', label: 'Estado', type: 'status' },
    { key: 'createdAt', label: 'Fecha de Creación', type: 'date' },
  ];

  readonly actions: TableAction<Tenant>[] = [
    {
      icon: 'edit',
      tooltip: 'Editar',
      color: 'primary',
      action: (row) => this.editTenant(row),
    },
    {
      icon: 'toggle_on',
      tooltip: 'Cambiar estado',
      color: 'accent',
      action: (row) => this.toggleStatus(row),
    },
  ];

  ngOnInit(): void {
    this.loadTenants();
  }

  private loadTenants(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.tenants.set(TENANTS_MOCK);
      this.loading.set(false);
    }, 400);
  }

  protected newTenant(): void {
    this.toastService.info('Modo mock', 'Funcionalidad de alta de cafetería (TODO: conectar con backend)');
  }

  private editTenant(tenant: Tenant): void {
    this.toastService.info('Modo mock', `Editar cafetería: ${tenant.name} (TODO: conectar con backend)`);
  }

  private toggleStatus(tenant: Tenant): void {
    const newStatus = !tenant.active;
    const message = newStatus ? 'activada' : 'desactivada';
    this.toastService.success('Estado actualizado', `Cafetería ${tenant.name} ${message} (mock)`);
  }
}
