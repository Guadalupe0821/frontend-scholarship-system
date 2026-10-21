export interface DashboardCard {
  title: string;
  value: number | string;
  period: string;
  change?: number;
  icon?: string;
}

export const MOCK_KPI_CARDS: DashboardCard[] = [
  {
    title: 'Alertas/eventos de umbral',
    value: 47,
    period: 'últimos 30 días',
    change: 8,
    icon: 'notifications_active',
  },
  {
    title: 'Reportes generados',
    value: 23,
    period: 'últimos 30 días',
    change: -12,
    icon: 'description',
  },
  {
    title: 'Total clientes',
    value: 128,
    period: 'en el sistema',
    change: 5,
    icon: 'group',
  },
  {
    title: 'Clientes activos',
    value: 102,
    period: 'del total',
    change: 3,
    icon: 'check_circle',
  },
];
