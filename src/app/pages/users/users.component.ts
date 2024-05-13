import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../core/interfaces/user.interface';
import { UserService } from '../../core/services/user.service';
import { NavbarComponent } from '../../features/navbar/navbar.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  users: User[] = [];

  ngOnInit() {
    this.userService.getAll().subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
