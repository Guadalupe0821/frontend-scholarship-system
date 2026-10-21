import { Component, input, computed, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { MenuItem as MenuItemModel } from './menu-item.model';

@Component({
  selector: 'app-menu-item',
  imports: [RouterModule, MatIconModule, MatExpansionModule, MatListModule],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.scss',
})
export class MenuItem {
  private router = inject(Router);

  public title = input.required<string>();
  public icon = input.required<string>();
  public route = input.required<string>();
  public subItems = input<MenuItemModel[] | undefined>();

  public hasSubItems = computed(() => {
    const items = this.subItems();
    return !!items && items.length > 0;
  });

  public isExpanded = computed(() => {
    const items = this.subItems();
    if (!items || items.length === 0) return false;

    const currentUrl = this.router.url;
    return items.some((item) => {
      const normalizedRoute = item.route.startsWith('/') ? item.route : `/${item.route}`;
      return currentUrl.startsWith(normalizedRoute);
    });
  });
}
