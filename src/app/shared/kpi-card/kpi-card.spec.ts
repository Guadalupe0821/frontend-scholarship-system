import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiCard } from './kpi-card';

describe('KpiCard', () => {
  let component: KpiCard;
  let fixture: ComponentFixture<KpiCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiCard],
    }).compileComponents();

    fixture = TestBed.createComponent(KpiCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display positive change with up arrow', () => {
    fixture.componentRef.setInput('change', 10);
    fixture.detectChanges();

    const changeElement = fixture.nativeElement.querySelector('.kpi-change');
    expect(changeElement).toBeTruthy();
    expect(changeElement.classList.contains('kpi-change--up')).toBeTrue();
    expect(changeElement.textContent).toContain('+10%');
  });

  it('should display negative change with down arrow', () => {
    fixture.componentRef.setInput('change', -5);
    fixture.detectChanges();

    const changeElement = fixture.nativeElement.querySelector('.kpi-change');
    expect(changeElement).toBeTruthy();
    expect(changeElement.classList.contains('kpi-change--down')).toBeTrue();
    expect(changeElement.textContent).toContain('-5%');
  });

  it('should not display change section when change is undefined', () => {
    fixture.componentRef.setInput('change', undefined);
    fixture.detectChanges();

    const changeElement = fixture.nativeElement.querySelector('.kpi-change');
    expect(changeElement).toBeFalsy();
  });

  it('should display title when provided', () => {
    fixture.componentRef.setInput('title', 'Test KPI');
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('.kpi-title');
    expect(titleElement.textContent).toContain('Test KPI');
  });

  it('should display value when provided', () => {
    fixture.componentRef.setInput('value', 42);
    fixture.detectChanges();

    const valueElement = fixture.nativeElement.querySelector('.kpi-value');
    expect(valueElement.textContent).toContain('42');
  });
});
