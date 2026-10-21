import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Field } from './field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('Field', () => {
  let component: Field;
  let fixture: ComponentFixture<Field>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Field, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Field);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('formGroup', new FormGroup({ test: new FormControl('') }));
    fixture.componentRef.setInput('field', { name: 'test', type: 'text', label: 'Test' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should support password field and toggle visibility', () => {
    fixture.componentRef.setInput('field', { name: 'password', type: 'password', label: 'Password' });
    fixture.componentRef.setInput('formGroup', new FormGroup({ password: new FormControl('') }));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input') as HTMLInputElement;
    const toggleButton = compiled.querySelector('button[matSuffix]') as HTMLButtonElement;

    expect(input.type).toBe('password');
    toggleButton.click();
    fixture.detectChanges();
    expect(input.type).toBe('text');
    toggleButton.click();
    fixture.detectChanges();
    expect(input.type).toBe('password');
  });

  it('should support boolean field with slide toggle and emit value', () => {
    fixture.componentRef.setInput('field', { name: 'active', type: 'boolean', label: 'Active' });
    fixture.componentRef.setInput('formGroup', new FormGroup({ active: new FormControl(true) }));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-slide-toggle')).toBeTruthy();

    spyOn(component.valueChange, 'emit');
    const slideToggle = compiled.querySelector('mat-slide-toggle') as HTMLElement;
    slideToggle.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.valueChange.emit).toHaveBeenCalled();
  });
});
