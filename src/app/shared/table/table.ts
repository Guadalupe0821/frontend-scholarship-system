import { SelectionModel } from '@angular/cdk/collections';
import { Component, computed, effect, input, output, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableAction, TableCellClick, TableColumn, TablePageEvent } from './table.model';

type CellValue = string | number | boolean | null;

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatCheckboxModule,
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table<T = unknown> {
  public readonly columns = input.required<TableColumn<T>[]>();
  public readonly data = input.required<T[]>();
  public readonly actions = input<TableAction<T>[]>([]);
  public readonly showFilter = input<boolean>(true);
  public readonly showPagination = input<boolean>(true);
  public readonly showSelection = input<boolean>(false);
  public readonly pageSize = input<number>(10);
  public readonly pageSizeOptions = input<number[]>([5, 10, 25, 50]);
  public readonly totalElements = input<number | null>(null);
  public readonly sortable = input<boolean>(true);

  public readonly rowClick = output<T>();
  public readonly cellClick = output<TableCellClick<T>>();
  public readonly selectionChange = output<T[]>();
  public readonly pageChange = output<TablePageEvent>();

  private readonly paginator = viewChild(MatPaginator);
  private readonly sort = viewChild(MatSort);

  protected readonly dataSource = new MatTableDataSource<T>([]);
  protected readonly selection = new SelectionModel<T>(true, []);

  private readonly currentSort = signal('');

  protected readonly displayedColumns = computed(() => [
    ...this.selectionColumn(),
    ...this.dataColumns(),
    ...this.actionsColumn(),
  ]);

  private readonly serverPaged = computed(() => this.totalElements() !== null);
  private readonly clientPaged = computed(() => this.showPagination() && !this.serverPaged());
  private readonly clientSorted = computed(() => this.sortable() && !this.serverPaged());

  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
      this.selection.clear();
    });

    effect(() => {
      this.dataSource.paginator = this.clientPaged() ? (this.paginator() ?? null) : null;
    });

    effect(() => {
      this.dataSource.sort = this.clientSorted() ? (this.sort() ?? null) : null;
    });
  }

  protected changePage(event: PageEvent): void {
    this.emitPageChange(event.pageIndex + 1, event.pageSize);
  }

  protected changeSort(event: Sort): void {
    if (!this.sortable()) {
      return;
    }

    this.currentSort.set(event.direction ? `${event.active}:${event.direction}` : '');
    this.emitPageChange(1, this.activePageSize());
  }

  protected applyFilter(event: Event): void {
    this.dataSource.filter = this.extractFilterValue(event);
    this.resetPaginatorIfNeeded();
  }

  protected emitRowClick(row: T): void {
    this.rowClick.emit(row);
  }

  protected emitCellClick(column: TableColumn<T>, row: T, event: Event): void {
    event.stopPropagation();
    this.cellClick.emit({ column, row });
  }

  protected executeAction(action: TableAction<T>, row: T, event: Event): void {
    event.stopPropagation();
    action.action(row);
  }

  protected toggleAllRows(): void {
    void (this.isAllSelected() ? this.selection.clear() : this.selectAllRows());
    this.emitSelectionChange();
  }

  protected toggleRow(row: T, event: Event): void {
    event.stopPropagation();
    this.selection.toggle(row);
    this.emitSelectionChange();
  }

  protected isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  protected getColumnKey(column: TableColumn<T>): string {
    return String(column.key);
  }

  protected getCellValue(row: T, column: TableColumn<T>): CellValue {
    if (column.customRender) {
      return column.customRender(row);
    }
    return this.readRowValue(row, column.key);
  }

  protected getSublabelValue(row: T, column: TableColumn<T>): CellValue {
    if (!column.sublabelKey) {
      return null;
    }
    return this.readRowValue(row, column.sublabelKey);
  }

  protected getRowAlertText(row: T, column: TableColumn<T>): string {
    return column.rowAlert ? column.rowAlert(row) : '';
  }

  private selectionColumn(): string[] {
    return this.showSelection() ? ['select'] : [];
  }

  private dataColumns(): string[] {
    return this.columns().map((column) => String(column.key));
  }

  private actionsColumn(): string[] {
    return this.actions().length > 0 ? ['actions'] : [];
  }

  private readRowValue(row: T, key: keyof T | string): CellValue {
    const record = row as Record<string, unknown>;
    return record[String(key)] as CellValue;
  }

  private activePageSize(): number {
    return this.paginator()?.pageSize || this.pageSize();
  }

  private selectAllRows(): void {
    this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  private emitSelectionChange(): void {
    this.selectionChange.emit(this.selection.selected);
  }

  private emitPageChange(page: number, pageSize: number): void {
    this.pageChange.emit({ page, pageSize, sortBy: this.currentSort() });
  }

  private extractFilterValue(event: Event): string {
    const input = event.target as HTMLInputElement;
    return input.value.trim().toLowerCase();
  }

  private resetPaginatorIfNeeded(): void {
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
