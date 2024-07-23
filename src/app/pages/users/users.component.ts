import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { UserCardComponent } from '../../features/user-card/user-card.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, UserCardComponent, AsyncPipe, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  users$ = this.userService.users$
  //users = this.userService.usersFiltered

  ngOnInit(): void {
    this.userService.getAll().subscribe();
  }

  createUser(form: NgForm) {
    this.userService.create(form.value).subscribe()
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe()
  }
}
