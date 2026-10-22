import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { DebugElement, signal } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Layout } from './layout';
import { LoadingService } from '../loading';

describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;
  let compiled: DebugElement;

  beforeEach(async () => {
    const loadingServiceMock = {
      isLoading: signal(false),
    };

    TestBed.configureTestingModule({
      imports: [Layout],
      providers: [
        provideRouter([]),
        { provide: Keycloak, useValue: { logout: () => Promise.resolve() } },
        { provide: LoadingService, useValue: loadingServiceMock },
      ],
    });

    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-drawer-container', () => {
    const drawerContainer = compiled.query(By.css('mat-drawer-container'));
    expect(drawerContainer).toBeTruthy();
    expect(drawerContainer.nativeElement.classList.contains('main-container')).toBe(true);
  });

  it('should render mat-drawer with sidenav opened by default', () => {
    const drawer = compiled.query(By.css('mat-drawer'));
    expect(drawer).toBeTruthy();
    expect(drawer.nativeElement.classList.contains('sidenav')).toBe(true);

    const drawerComponent = compiled.query(By.directive(MatDrawer)).componentInstance;
    expect(drawerComponent.opened).toBe(true);
  });

  it('should render app-side-nav component inside drawer', () => {
    const sideNav = compiled.query(By.css('app-side-nav'));
    expect(sideNav).toBeTruthy();
  });

  it('should render toolbar with primary color', () => {
    const toolbar = compiled.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();
    expect(toolbar.nativeElement.getAttribute('color')).toBe('primary');
  });

  it('should render menu toggle button', () => {
    const menuButton = compiled.query(By.css('button[mat-icon-button]'));
    expect(menuButton).toBeTruthy();

    const icon = menuButton.query(By.css('mat-icon'));
    expect(icon.nativeElement.textContent.trim()).toBe('menu');
  });

  it('should toggle drawer when menu button is clicked', () => {
    const drawerComponent = compiled.query(By.directive(MatDrawer)).componentInstance;
    const initialState = drawerComponent.opened;

    const menuButton = compiled.query(By.css('button[mat-icon-button]'));
    menuButton.nativeElement.click();
    fixture.detectChanges();

    expect(drawerComponent.opened).toBe(!initialState);
  });

  it('should render app-theme-toggle component', () => {
    const themeToggle = compiled.query(By.css('app-theme-toggle'));
    expect(themeToggle).toBeTruthy();
  });

  it('should render account button with icon', () => {
    const accountButton = compiled.query(By.css('button[aria-label="Mi perfil"]'));
    expect(accountButton).toBeTruthy();

    const icon = accountButton.query(By.css('mat-icon'));
    expect(icon.nativeElement.textContent.trim()).toBe('account_circle');
  });

  it('should render app-breadcrumb component', () => {
    const breadcrumb = compiled.query(By.css('app-breadcrumb'));
    expect(breadcrumb).toBeTruthy();
  });

  it('should render router-outlet for page content', () => {
    const routerOutlet = compiled.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });

  it('should have main-content landmark', () => {
    const mainContent = compiled.query(By.css('main.main-content'));
    expect(mainContent).toBeTruthy();
  });

  it('should have page-content region', () => {
    const pageContent = compiled.query(By.css('section.page-content'));
    expect(pageContent).toBeTruthy();
  });

  it('should have toolbar-actions div with theme toggle and account button', () => {
    const toolbarActions = compiled.query(By.css('.toolbar-actions'));
    expect(toolbarActions).toBeTruthy();

    const themeToggle = toolbarActions.query(By.css('app-theme-toggle'));
    const accountButton = toolbarActions.query(By.css('button[aria-label="Mi perfil"]'));

    expect(themeToggle).toBeTruthy();
    expect(accountButton).toBeTruthy();
  });
});
