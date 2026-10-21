import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { isValidBackUrl, NAVIGATION_FALLBACK_URL } from './page-header.model';
@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {
  public title = input<string>();
  public icon = input<string | undefined>();
  public showBackButton = input<boolean>(true);
  public backUrl = input<string>();

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  goBack(): void {
    const breadcrumbParentUrl = this.activatedRoute.snapshot.data['breadcrumbParentUrl'];
    const from = this.activatedRoute.snapshot.queryParamMap.get('from');
    const backUrl = [this.backUrl(), from, breadcrumbParentUrl].find(isValidBackUrl) ?? NAVIGATION_FALLBACK_URL;

    void this.router.navigateByUrl(backUrl);
  }
}
