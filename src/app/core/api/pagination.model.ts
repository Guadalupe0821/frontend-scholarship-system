export interface PageRequest {
  page?: number;
  pageSize?: number;
  sortBy?: string;
}

export const DEFAULT_PAGE_REQUEST: PageRequest = {
  page: 1,
  pageSize: 10,
};
