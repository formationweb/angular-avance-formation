import { Component, Input } from '@angular/core';
import { User } from 'src/app/core/user.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user: User = {} as User
}
