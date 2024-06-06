import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  title = signal('Mon App');

  setTitle(val: string) {
    this.title.set(val);
  }
}
