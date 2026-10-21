import { HttpErrorResponse } from '@angular/common/http';

export interface ApiError {
  process?: string;
  message?: string;
  errors?: string[];
}

export function isHttpError(error: unknown): error is HttpErrorResponse {
  return error instanceof HttpErrorResponse;
}

export function extractApiError(error: unknown): ApiError | null {
  if (!isHttpError(error)) {
    return null;
  }
  return (error.error as ApiError) ?? null;
}

export function apiErrorMessage(error: unknown, fallback: string): string {
  const apiError = extractApiError(error);
  const detail = apiError?.errors?.length ? apiError.errors.join(' ') : '';
  const message = apiError?.message ?? '';

  return [message, detail].filter(Boolean).join(' ') || fallback;
}
