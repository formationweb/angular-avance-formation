import { Component, input, Input } from '@angular/core';
import { User } from '../../core/interfaces/user';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  //@Input() user: User = {} as User
  user = input<User>({} as User)
}
