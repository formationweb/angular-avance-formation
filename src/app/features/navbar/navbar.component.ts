import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <nav>
      {{ title }}
      <input type="text" [(ngModel)]="username"><button (click)="search()">Rechercher</button>
      <a routerLink="/login">Se connecter</a>
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
