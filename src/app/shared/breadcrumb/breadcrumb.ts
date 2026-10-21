import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface BreadcrumbItem {
  label: string;
  url: string;
}

interface RouteData {
  breadcrumb?: string;
  breadcrumbParent?: string;
  breadcrumbParentUrl?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly navigationEnd$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
  );

  private readonly navigationSignal = toSignal(this.navigationEnd$, { initialValue: null });

  readonly breadcrumbs = computed(() => {
    this.navigationSignal();
    return this.buildBreadcrumbs(this.activatedRoute.root);
  });

  private buildBreadcrumbs(route: ActivatedRoute, url = '', breadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
    const primaryChild = route.children.find((child) => child.outlet === 'primary');
    if (!primaryChild || !primaryChild.snapshot) return breadcrumbs;

    const routeUrl = this.buildRouteUrl(primaryChild, url);
    const routeData = primaryChild.snapshot.data as RouteData;

    this.addBreadcrumbItems(routeData, routeUrl, breadcrumbs);

    return this.buildBreadcrumbs(primaryChild, routeUrl, breadcrumbs);
  }

  private buildRouteUrl(route: ActivatedRoute, currentUrl: string): string {
    const routeSegment = route.snapshot.url.map((segment) => segment.path).join('/');
    return routeSegment ? `${currentUrl}/${routeSegment}` : currentUrl;
  }

  private addBreadcrumbItems(routeData: RouteData, routeUrl: string, breadcrumbs: BreadcrumbItem[]): void {
    if (routeData.breadcrumbParent && routeData.breadcrumbParentUrl) {
      breadcrumbs.push({
        label: routeData.breadcrumbParent,
        url: this.normalizeUrl(routeData.breadcrumbParentUrl),
      });
    }
    if (routeData.breadcrumb) {
      breadcrumbs.push({
        label: routeData.breadcrumb,
        url: routeUrl,
      });
    }
  }

  private normalizeUrl(url: string): string {
    return url.startsWith('/') ? url : `/${url}`;
  }
}
