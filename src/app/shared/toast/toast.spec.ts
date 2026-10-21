import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { Toast } from './toast';
import { ToastData } from './toast.model';

describe('Toast', () => {
  let component: Toast;
  let fixture: ComponentFixture<Toast>;

  const data: ToastData = {
    type: 'success',
    title: 'Successfully saved!',
    description: 'Anyone with a link can now view this file.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toast],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: data },
        { provide: MatSnackBarRef, useValue: { dismiss: () => undefined } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Toast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title and the description', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.toast-title')?.textContent).toContain(data.title);
    expect(element.querySelector('.toast-description')?.textContent).toContain(data.description);
  });
});
