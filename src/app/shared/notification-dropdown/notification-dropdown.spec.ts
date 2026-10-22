import { formatDate } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatMenuTrigger } from '@angular/material/menu';

import { NotificationDropdown } from './notification-dropdown';
import { Notification } from './notification-dropdown.model';

describe('NotificationDropdown', () => {
  let component: NotificationDropdown;
  let fixture: ComponentFixture<NotificationDropdown>;

  const notifications: Notification[] = [
    {
      name: 'Alerta de cuenta',
      date: new Date('2026-09-07T10:00:00'),
      text: 'Se detecto un inicio de sesion inusual',
      icon: 'warning',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getTrigger(): MatMenuTrigger {
    const button = fixture.debugElement.query(By.css('.notification-button'));
    return button.injector.get(MatMenuTrigger);
  }

  function openMenu(): void {
    getTrigger().openMenu();
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide the badge when there are no notifications', () => {
    expect(fixture.debugElement.query(By.css('.mat-badge-hidden'))).toBeTruthy();
  });

  it('should show a badge with the notification count', () => {
    fixture.componentRef.setInput('notifications', notifications);
    fixture.detectChanges();

    // MatBadge appends its content node imperatively through Renderer2, so it never enters
    // Angular's DebugElement tree. It has to be read from the real DOM.
    const badge = fixture.nativeElement.querySelector('.mat-badge-content');
    expect(badge).toBeTruthy();
    expect(badge.textContent.trim()).toBe('1');
    expect(fixture.debugElement.query(By.css('.mat-badge-hidden'))).toBeNull();
  });

  it('should show an empty message when there are no notifications', () => {
    openMenu();
    expect(document.querySelector('.notification-empty')?.textContent?.trim()).toBe(
      'No hay notificaciones',
    );
  });

  it('should render each notification with icon, name, date and text', () => {
    fixture.componentRef.setInput('notifications', notifications);
    openMenu();

    const items = document.querySelectorAll<HTMLElement>('.notification-item');
    expect(items.length).toBe(1);

    const item = items[0];
    expect(item.querySelector('.notification-item-icon')?.textContent).toBe('warning');
    expect(item.querySelector('.notification-name')?.textContent).toBe('Alerta de cuenta');
    const expectedDate = formatDate(notifications[0].date, 'short', TestBed.inject(LOCALE_ID));
    expect(item.querySelector('.notification-date')?.textContent).toBe(expectedDate);
    expect(item.querySelector('.notification-text')?.textContent).toBe(
      'Se detecto un inicio de sesion inusual',
    );
  });

  it('should use a fallback icon when the notification has none', () => {
    fixture.componentRef.setInput('notifications', [
      { name: 'Sin icono', date: new Date(), text: 'Mensaje' },
    ]);
    openMenu();

    expect(document.querySelector('.notification-item-icon')?.textContent).toBe('notifications');
  });

  it('should emit viewAll when the footer link is clicked', () => {
    const emitSpy = spyOn(component.viewAll, 'emit');
    fixture.componentRef.setInput('notifications', notifications);
    openMenu();

    const footer = document.querySelector<HTMLElement>('.notification-panel-footer');
    footer?.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalled();
  });
});
