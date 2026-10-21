export interface Notification {
  name: string;
  date: string | Date;
  text: string;
  icon?: string;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    name: 'Sofía Elena Ramírez Torres',
    date: new Date('2026-09-07T16:45:00'),
    text: 'Transacción inusual detectada en cuenta.',
    icon: 'report_problem',
  },
  {
    name: 'Alejandro Morales Mendoza',
    date: new Date('2026-09-07T11:20:00'),
    text: 'Documentación de identificación vencida.',
    icon: 'badge',
  },
  {
    name: 'Valentina Ortega Castillo',
    date: new Date('2026-09-06T18:15:00'),
    text: 'Coincidencia del 92% en lista de sanciones.',
    icon: 'gavel',
  },
  {
    name: 'Gabriel Silva Espinoza',
    date: new Date('2026-09-06T08:50:00'),
    text: 'Nuevo expediente de persona moral creado.',
    icon: 'domain',
  },
  {
    name: 'Camila Navarro Vargas',
    date: new Date('2026-09-05T17:10:00'),
    text: 'Perfil actualizado tras revisión de cumplimiento.',
    icon: 'verified_user',
  },
  {
    name: 'Diego Armando Reyes Paredes',
    date: new Date('2026-09-05T13:05:00'),
    text: 'Intento de acceso desde IP no autorizada.',
    icon: 'security',
  },
  {
    name: 'Mariana Delgado Ríos',
    date: new Date('2026-09-04T15:40:00'),
    text: 'Nivel de riesgo elevado a Alto.',
    icon: 'trending_up',
  },
  {
    name: 'Fernando Javier Vega Cruz',
    date: new Date('2026-09-03T10:30:00'),
    text: 'Persona removida de la lista restringida.',
    icon: 'lock_open',
  },
];
