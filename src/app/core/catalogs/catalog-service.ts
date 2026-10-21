import { inject, Service } from '@angular/core';
import { FormFieldOption } from '@mean/shared';
import { map, Observable, shareReplay } from 'rxjs';
import { ApiService } from '@mean/api';
import { Catalog, CatalogType } from './catalog.model';

@Service()
export class CatalogService {
  private readonly api = inject(ApiService);

  private readonly cache = new Map<CatalogType, Observable<FormFieldOption[]>>();

  fetchOptions(type: CatalogType): Observable<FormFieldOption[]> {
    const cached = this.cache.get(type);
    if (cached) {
      return cached;
    }

    const request = this.requestOptions(type);
    this.cache.set(type, request);
    return request;
  }

  private requestOptions(type: CatalogType): Observable<FormFieldOption[]> {
    return this.api.get<Catalog[]>(`/catalogs/${type}`).pipe(
      map((response) => (response.data ?? []).map(CatalogService.toOption)),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
  }

  private static toOption(entry: Catalog): FormFieldOption {
    return { value: entry.id, label: entry.description, code: entry.code };
  }
}
