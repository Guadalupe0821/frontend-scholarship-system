import { Component, input, output, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormField } from './form-field.model';

type FieldValue = string | number | boolean | Date | null;

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './field.html',
  styleUrl: './field.scss',
})
export class Field {
  readonly field = input.required<FormField>();
  readonly formGroup = input.required<FormGroup>();

  readonly valueChange = output<{ name: string; value: FieldValue }>();

  protected readonly maxDate = new Date();
  protected readonly hidePassword = signal(true);

  protected togglePasswordVisibility(event: MouseEvent): void {
    event.stopPropagation();
    this.hidePassword.update((val) => !val);
  }

  protected onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value: string | number = target.type === 'number' ? Number(target.value) : target.value;
    this.valueChange.emit({ name: this.field().name, value });
  }

  protected onSlideToggleChange(event: MatSlideToggleChange): void {
    this.valueChange.emit({ name: this.field().name, value: event.checked });
  }

  protected onCheckboxChange(event: MatCheckboxChange): void {
    this.valueChange.emit({ name: this.field().name, value: event.checked });
  }

  protected onSelectChange(event: MatSelectChange): void {
    this.valueChange.emit({ name: this.field().name, value: event.value });
  }

  protected onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.valueChange.emit({ name: this.field().name, value: event.value });
  }
}
