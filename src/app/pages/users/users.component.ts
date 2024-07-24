import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserService } from '../../core/services/user.service';
import { ColorComponent } from '../../features/color/color.component';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { UserCardComponent } from '../../features/user-card/user-card.component';
import { IStore } from '../../store/store.interface';
import { userCreateAction, usersActionGetAll } from '../../store/users/users.action';
import { selectUsersList } from '../../store/users/users.selector';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, UserCardComponent, AsyncPipe, FormsModule, ColorComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  private store = inject<Store<IStore>>(Store)
  users$ = this.store.select(selectUsersList)
  colorSelected = 'red'
  //users = this.userService.usersFiltered

  ngOnInit(): void {
    this.store.dispatch(usersActionGetAll({
      sort: 'name'
    }))
  }

  createUser(form: NgForm) {
    this.store.dispatch(userCreateAction({
      payload: form.value
    }))
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe()
  }
}
