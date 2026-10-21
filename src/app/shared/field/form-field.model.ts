import { ValidatorFn } from '@angular/forms';

export interface FormFieldOption {
  value: unknown;
  label: string;
  code?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'date' | 'select' | 'email' | 'password';
  value?: FormFieldValue;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  options?: FormFieldOption[];
  catalog?: string;
  validators?: ValidatorFn[];
  errorMessages?: Record<string, string>;
  grids?: string;
  maxLength?: number;
  min?: number;
  max?: number;
}

export type FormFieldValue = string | number | boolean | Date | null;
