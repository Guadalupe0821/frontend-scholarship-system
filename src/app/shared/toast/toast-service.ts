import { inject, Service } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Toast } from './toast';
import {
  TOAST_DURATION,
  TOAST_ERROR_DURATION,
  TOAST_PANEL_CLASS,
  ToastData,
  ToastType,
} from './toast.model';

@Service()
export class ToastService {
  private readonly snackBar = inject(MatSnackBar);

  public success(title: string, description?: string): void {
    this.open({ type: 'success', title, description });
  }

  public error(title: string, description?: string): void {
    this.open({ type: 'error', title, description });
  }

  public warning(title: string, description?: string): void {
    this.open({ type: 'warning', title, description });
  }

  public info(title: string, description?: string): void {
    this.open({ type: 'info', title, description });
  }

  private open(data: ToastData): void {
    this.snackBar.openFromComponent(Toast, { ...this.config(data.type), data });
  }

  private config(type: ToastType): MatSnackBarConfig<ToastData> {
    return {
      duration: this.duration(type),
      panelClass: TOAST_PANEL_CLASS,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };
  }

  private duration(type: ToastType): number {
    return type === 'error' ? TOAST_ERROR_DURATION : TOAST_DURATION;
  }
}
