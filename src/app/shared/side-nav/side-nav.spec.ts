import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SideNav } from './side-nav';

describe('SideNav', () => {
  let component: SideNav;
  let fixture: ComponentFixture<SideNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNav],
      providers: [
        provideRouter([]),
        { provide: Keycloak, useValue: { logout: () => Promise.resolve() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SideNav);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activeSection', 'operaciones');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logout action', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.logout')?.textContent).toContain('Cerrar sesión');
  });
});
