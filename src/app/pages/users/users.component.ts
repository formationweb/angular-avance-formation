import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../core/interfaces/user.interface';
import { UserService } from '../../core/services/user.service';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { UserCardComponent } from '../../features/user-card/user-card.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, UserCardComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  users: User[] = [];

  ngOnInit(): void {
    this.userService.getAll().subscribe((users) => {
      this.users = users;
    });
  }
}
