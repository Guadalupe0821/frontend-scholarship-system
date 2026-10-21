export interface ApiPagination {
  page: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
  totalElements: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: ApiPagination;
}
