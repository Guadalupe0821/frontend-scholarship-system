export interface TableColumn<T = unknown> {
  key: keyof T | string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'status' | 'custom';
  sortable?: boolean;
  bold?: boolean;
  customRender?: (row: T) => string;
  statusValue?: (row: T) => string;
  rowAlert?: (row: T) => string;
  sublabelKey?: keyof T | string;
  navigable?: boolean;
}

export interface TableAction<T = unknown> {
  icon: string;
  tooltip: string;
  color?: 'primary' | 'accent' | 'warn';
  action: (row: T) => void;
}

export interface TableCellClick<T = unknown> {
  column: TableColumn<T>;
  row: T;
}

export interface TablePageEvent {
  page: number;
  pageSize: number;
  sortBy: string;
}
