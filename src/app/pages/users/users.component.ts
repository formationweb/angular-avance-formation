import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../core/interfaces/user.interface';
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
  users$: Observable<User[]> = this.userService.users$;
  search$: Observable<string> = this.userService.search$;

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
