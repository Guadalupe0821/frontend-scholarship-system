import { Service, signal } from '@angular/core';

@Service()
export class LoadingService {
  private readonly requestCount = signal(0);

  readonly isLoading = signal(false);

  startRequest(): void {
    this.requestCount.update((count) => count + 1);
    this.isLoading.set(true);
  }

  endRequest(): void {
    this.requestCount.update((count) => Math.max(0, count - 1));
    if (this.requestCount() === 0) {
      this.isLoading.set(false);
    }
  }
}
