import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Notification } from './notification-dropdown.model';

@Component({
  selector: 'app-notification-dropdown',
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatMenuModule, DatePipe],
  templateUrl: './notification-dropdown.html',
  styleUrl: './notification-dropdown.scss',
})
export class NotificationDropdown {
  readonly notifications = input<Notification[]>([]);
  readonly label = input<string>('Notificaciones');

  readonly viewAll = output<void>();
}
