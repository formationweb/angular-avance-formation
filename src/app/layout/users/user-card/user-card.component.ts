import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/core/user.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user: User = {} as User
  @Output() deleteUser: EventEmitter<number> = new EventEmitter()

  removeUser() {
     this.deleteUser.emit(this.user.id)
  }
}
