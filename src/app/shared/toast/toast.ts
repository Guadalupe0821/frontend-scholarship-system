import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { TOAST_ICONS, ToastData } from './toast.model';

@Component({
  selector: 'app-toast',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  private readonly snackBarRef = inject(MatSnackBarRef);

  protected readonly data = inject<ToastData>(MAT_SNACK_BAR_DATA);

  protected readonly icon = TOAST_ICONS[this.data.type];

  protected dismiss(): void {
    this.snackBarRef.dismiss();
  }
}
