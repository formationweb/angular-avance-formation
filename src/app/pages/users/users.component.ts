import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../../core/interfaces/user.interface';
import { UserService } from '../../core/services/user.service';
import { ColorComponent } from '../../features/color/color.component';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { UserCardComponent } from '../../features/user-card/user-card.component';
import { CreateUserAction, GetUsersAction } from '../../store/users/users.action';
import { UsersState } from '../../store/users/users.state';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, UserCardComponent, AsyncPipe, FormsModule, ColorComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  private store = inject(Store)
  users$: Observable<User[]> = this.store.select(UsersState.getUsersList)

  ngOnInit(): void {
    this.store.dispatch(new GetUsersAction('name'))
  }

  createUser(form: NgForm) {
    this.store.dispatch(new CreateUserAction(form.value))
  }

  deleteUser(id: number) {
  }
}
