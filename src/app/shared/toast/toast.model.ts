export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  type: ToastType;
  title: string;
  description?: string;
}

export const TOAST_ICONS: Record<ToastType, string> = {
  success: 'check_circle_outline',
  error: 'error_outline',
  warning: 'report_problem',
  info: 'info_outline',
};

export const TOAST_PANEL_CLASS = 'app-toast-panel';

export const TOAST_DURATION = 5000;

export const TOAST_ERROR_DURATION = 8000;
