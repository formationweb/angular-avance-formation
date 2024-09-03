import { Component, inject, OnInit} from '@angular/core';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { UserService } from '../../core/services/user.service';
import { NgFor } from '@angular/common';
import { User } from '../../core/interfaces/user';
import { UserCardComponent } from '../../features/user-card/user-card.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, UserCardComponent /*, NgFor*/],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService)
  users: User[] = []

  ngOnInit(): void {
    this.userService.getAll().subscribe((users) => {
      this.users = users
    })
  }
}
