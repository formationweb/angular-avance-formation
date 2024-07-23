import { Component, EventEmitter, Output, effect, input } from '@angular/core';
import { User } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  user = input<User>({} as User)
  @Output() eventDelete: EventEmitter<number> = new EventEmitter()

  constructor() {
    effect(() => {
     // console.log(this.user())
    })
  }

  removeUser() {
    this.eventDelete.emit(this.user().id)
  }
}
