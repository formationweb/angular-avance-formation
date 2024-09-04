import { Component, Input } from '@angular/core';
import { User } from '../../core/interfaces/user';
import { EmailComponent } from './email/email.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [EmailComponent],
  template: `
    <article>
      <header userName>{{ user.name }}</header>
      <button (click)="changeName()">Changer nom</button>
      <app-email [user]="user"></app-email>
    </article>
  `
})
export class UserCardComponent {
  @Input() user: User = {} as User;

  changeName() {
    this.user.name = ''+Math.random()
  }
}
