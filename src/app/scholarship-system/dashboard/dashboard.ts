import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PageHeader, KpiCard } from '@mean/shared';

@Component({
  selector: 'app-dashboard',
  imports: [PageHeader, KpiCard, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
