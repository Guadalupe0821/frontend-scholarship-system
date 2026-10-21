export type CatalogType =
  | 'ECONOMIC_ACTIVITY'
  | 'SOURCE_OF_FUNDS'
  | 'PRODUCT'
  | 'EXPECTED_VOLUME'
  | 'MONETARY_INSTRUMENT'
  | 'NATIONALITY'
  | 'COUNTRY_CALLING_CODE'
  | 'COUNTRY'
  | 'STATE'
  | 'EMPLOYEE_COUNT'
  | 'NEIGHBORHOOD';

export interface Catalog {
  id: number;
  type: CatalogType;
  code: string;
  description: string;
  sortOrder: number;
}
