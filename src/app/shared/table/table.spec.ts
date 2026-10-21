import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Table } from './table';
import { TableAction, TableColumn } from './table.model';

interface Row {
  id: string;
  name: string;
  active: boolean;
}

describe('Table', () => {
  let component: Table<Row>;
  let fixture: ComponentFixture<Table<Row>>;

  const columns: TableColumn<Row>[] = [{ key: 'name', label: 'Nombre' }];
  const rows: Row[] = [
    { id: '1', name: 'Acme', active: true },
    { id: '2', name: 'Globex', active: false },
  ];

  const setUp = (actions: TableAction<Row>[] = []): void => {
    fixture = TestBed.createComponent<Table<Row>>(Table);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('data', rows);
    fixture.componentRef.setInput('actions', actions);
    fixture.detectChanges();
  };

  const openRowMenu = (index: number): void => {
    const trigger = fixture.nativeElement.querySelectorAll('[aria-label="Abrir acciones de fila"]')[
      index
    ] as HTMLElement;
    trigger.click();
    fixture.detectChanges();
  };

  const menuItems = (): HTMLElement[] =>
    Array.from(document.querySelectorAll('.mat-mdc-menu-panel button[mat-menu-item]'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Table],
    }).compileComponents();
  });

  it('should create', () => {
    setUp();
    expect(component).toBeTruthy();
  });

  it('should not render the actions column when there are no actions', () => {
    setUp();
    expect(fixture.nativeElement.querySelector('[aria-label="Abrir acciones de fila"]')).toBeNull();
  });

  it('should open the row actions menu', () => {
    setUp([{ icon: 'sync_alt', tooltip: 'Desactivar', action: () => undefined }]);
    openRowMenu(0);

    expect(document.querySelector('.mat-mdc-menu-panel')).toBeTruthy();
    expect(menuItems().length).toBe(1);
  });
});
