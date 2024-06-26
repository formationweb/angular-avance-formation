import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends Notyf {
  constructor() {
    super({
      position: {
        y: 'top',
        x: 'center',
      },
    });
  }
}
