import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <nav>
      {{ title }}
      <input type="text" [(ngModel)]="username"><button (click)="search()">Rechercher</button>
    </nav>
  `
})
export class NavbarComponent {
  private userService = inject(UserService)
  title = 'My App';
  username = ''

  search() {
    this.userService.setSearch(this.username)
  }
}
