import { Component, input, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormField } from '../field/form-field.model';
import { Field } from '../field/field';

interface FormFieldValueChangeEvent {
  readonly name: string;
  readonly value: unknown;
}

interface FormControlConfig {
  readonly value: unknown;
  readonly disabled: boolean;
}

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, Field],
  templateUrl: './form-builder.html',
  styleUrl: './form-builder.scss',
})
export class FormBuilder implements OnInit {
  public fields = input.required<FormField[]>();
  public showButtons = input<boolean>(true);
  public valueChange = output<FormFieldValueChangeEvent>();
  public formSubmit = output<unknown>();

  public formGroup!: FormGroup;

  public ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const controls = this.createFormControls();
    this.formGroup = new FormGroup(controls);
  }

  private createFormControls(): Record<string, FormControl> {
    const controls: Record<string, FormControl> = {};
    this.fields().forEach((field: FormField) => {
      controls[field.name] = this.createFormControl(field);
    });
    return controls;
  }

  private createFormControl(field: FormField): FormControl {
    const validators = this.getValidators(field);
    const config = this.buildControlConfig(field);
    return new FormControl(config, validators);
  }

  private buildControlConfig(field: FormField): FormControlConfig {
    return {
      value: field.value ?? null,
      disabled: field.disabled ?? false,
    };
  }

  private getValidators(field: FormField): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.type === 'number') {
      validators.push(...this.getNumberValidators(field));
    }

    if (field.validators) {
      validators.push(...field.validators);
    }

    return validators;
  }

  private getNumberValidators(field: FormField): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (field.min !== undefined) {
      validators.push(Validators.min(field.min));
    }

    if (field.max !== undefined) {
      validators.push(Validators.max(field.max));
    }

    return validators;
  }

  public emitValueChange(event: FormFieldValueChangeEvent): void {
    this.valueChange.emit(event);
  }

  public submitForm(): void {
    if (this.formGroup.valid) {
      this.emitFormValue();
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  private emitFormValue(): void {
    this.formSubmit.emit(this.formGroup.getRawValue());
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key)?.markAsTouched();
    });
  }
}
