import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { Breadcrumb } from './breadcrumb';

describe('Breadcrumb', () => {
  let component: Breadcrumb;
  let fixture: ComponentFixture<Breadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Breadcrumb],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Breadcrumb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize breadcrumbs array', () => {
    expect(component.breadcrumbs()).toBeDefined();
    expect(Array.isArray(component.breadcrumbs())).toBe(true);
  });

  it('should render navigation landmark', () => {
    const nav = fixture.debugElement.query(By.css('nav[aria-label="Ruta de navegacion"]'));
    expect(nav).toBeTruthy();
  });

  it('should mark at most one breadcrumb as current page when items exist', () => {
    const crumbs = component.breadcrumbs();
    fixture.detectChanges();

    const current = fixture.debugElement.queryAll(By.css('[aria-current="page"]'));
    if (crumbs.length === 0) {
      expect(current.length).toBe(0);
    } else {
      expect(current.length).toBe(1);
      const listItems = fixture.debugElement.queryAll(By.css('ol > li'));
      expect(listItems[listItems.length - 1].query(By.css('[aria-current="page"]'))).toBeTruthy();
    }
  });
});
