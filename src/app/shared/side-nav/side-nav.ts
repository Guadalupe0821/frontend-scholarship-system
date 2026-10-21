import { Component, computed, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MenuItem } from '../menu-item/menu-item';
import { MenuItems } from '../menu-item/menu-item.model';
import { AuthService } from '@mean/auth';

@Component({
  selector: 'app-side-nav',
  imports: [MenuItem, MatListModule, MatIcon],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  private readonly authService = inject(AuthService);

  readonly activeSection = input.required<string>();

  readonly visibleItems = computed(() => {
    const section = this.activeSection();
    return MenuItems.filter((item) => {
      if (item.sections && !item.sections.includes(section)) return false;
      if (item.roles && item.roles.length > 0) {
        return this.authService.hasAnyRole(item.roles as any);
      }
      return true;
    });
  });

  protected logout(): void {
    this.authService.logout();
  }
}
