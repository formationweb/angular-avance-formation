import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user: User = {} as User
  @Output() eventDelete: EventEmitter<number> = new EventEmitter()

  removeUser() {
    this.eventDelete.emit(this.user.id)
  }
}
