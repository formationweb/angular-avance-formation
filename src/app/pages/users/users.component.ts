import { AsyncPipe } from '@angular/common';
import { Component, OnInit, effect, inject } from '@angular/core';
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
  users = this.userService.usersFiltered
  nbUsersByName = this.userService.nbUsersByName
  search = this.userService.search;

  constructor() {
    effect(() => {
      const users = this.users()
      if (users.length > 1000) {
        console.log('Trop d\'utilisateurs')
      }
    })
  }

  ngOnInit() {
    this.userService.getAll().subscribe(); // action
  }

  createUser(form: NgForm) {
    this.userService.create(form.value).subscribe({
      next: (user) => {
        console.log(user);
      },
      error: (err) => {
        console.log(err);
      },
      // complete: () => {
      //   console.log('finish');
      // },
    });
  }
}
