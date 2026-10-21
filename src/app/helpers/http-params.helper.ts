import { HttpParams } from '@angular/common/http';

export type QueryValue = string | number | boolean | null | undefined;

export type QueryParams = Record<string, QueryValue>;

export function toHttpParams(source: QueryParams): HttpParams {
  return Object.entries(source).reduce((params, [key, value]) => {
    const isEmpty = value === undefined || value === null || value === '';
    return isEmpty ? params : params.set(key, String(value));
  }, new HttpParams());
}
