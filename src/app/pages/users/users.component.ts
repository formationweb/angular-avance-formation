import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../../core/interfaces/user.interface';
import { UserService } from '../../core/services/user.service';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { UserCardComponent } from '../../features/user-card/user-card.component';
import { CreateUsersAction, GetUsersAction } from '../../store/users/users.action';
import { UsersState } from '../../store/users/users.state';
import { ColorComponent } from './../../features/color/color.component';

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

  @Select(UsersState.getUsersList) users$!: Observable<User[]>;
  search$: Observable<string> = this.userService.search$;
  colorSelected = ''

  ngOnInit() {
    this.store.dispatch(new GetUsersAction('name'))
  }

  createUser(form: NgForm) {
    this.store.dispatch(new CreateUsersAction(form.value))
  }

  deleteUser(id: number) {
    
  }
}
