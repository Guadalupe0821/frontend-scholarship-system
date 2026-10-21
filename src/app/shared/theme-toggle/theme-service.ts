import { Service, signal, effect } from '@angular/core';

@Service()
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';

  isDarkMode = signal<boolean>(this.loadThemeFromStorage());

  constructor() {
    effect(() => {
      this.applyTheme(this.isDarkMode());
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update((value) => !value);
    this.saveThemeToStorage(this.isDarkMode());
  }

  private applyTheme(isDark: boolean): void {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark-theme');
    } else {
      html.classList.remove('dark-theme');
    }
  }

  private loadThemeFromStorage(): boolean {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme === null) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return savedTheme === 'dark';
  }

  private saveThemeToStorage(isDark: boolean): void {
    localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
  }
}
