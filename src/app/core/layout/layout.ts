import { Component, input, signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

import {
  Breadcrumb,
  SideNav,
  ThemeToggle,
  Notification,
  NotificationDropdown,
  MOCK_NOTIFICATIONS,
} from '@mean/shared';
import { Loading, LoadingService } from '../loading';

export interface LayoutToolbarSection {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
}

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    RouterOutlet,
    SideNav,
    MatIconModule,
    MatToolbarModule,
    ThemeToggle,
    Breadcrumb,
    NotificationDropdown,
    MatMenuModule,
    Loading,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  readonly activeSection = signal('');

  readonly toolbarSections: readonly LayoutToolbarSection[] = [];

  notifications = input<Notification[]>(MOCK_NOTIFICATIONS);
  private readonly router = inject(Router);
  private readonly loadingService = inject(LoadingService);

  protected isLoading = this.loadingService.isLoading;

  protected allNotifications(): void {
    void this.router.navigate(['/notifications']);
  }

  protected goToProfile(): void {
    void this.router.navigate(['/profile']);
  }

  protected setSection(section: string): void {
    this.activeSection.set(section);
  }
}
