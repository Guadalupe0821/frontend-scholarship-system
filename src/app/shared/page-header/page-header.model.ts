export const NAVIGATION_FALLBACK_URL = '/dashboard';

export function isValidBackUrl(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//');
}