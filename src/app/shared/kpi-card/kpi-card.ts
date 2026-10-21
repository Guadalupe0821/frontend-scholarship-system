import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kpi-card',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.scss',
})
export class KpiCard {
  readonly title = input<string>();
  readonly value = input<number | string>();
  readonly period = input<string>();
  readonly change = input<number>();
  readonly icon = input<string>();

  protected readonly trendUp = computed(() => {
    const change = this.change();
    return change !== undefined ? change >= 0 : true;
  });

  protected readonly changeLabel = computed(() => {
    const change = this.change();
    return change === undefined ? '' : `${change > 0 ? '+' : ''}${change}%`;
  });
}
