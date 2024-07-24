import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, interval } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { ColorComponent } from '../../features/color/color.component';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { UserCardComponent } from '../../features/user-card/user-card.component';
import { IStore } from '../../store/store.interface';
import { userCreateAction, userDeleteAction, usersActionGetAll } from '../../store/users/users.action';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, UserCardComponent, AsyncPipe, FormsModule, ColorComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private store = inject<Store<IStore>>(Store)
  users$ = this.userService.usersFiltered$
  colorSelected = 'red'
  subscription!: Subscription
  //users = this.userService.usersFiltered

  ngOnInit(): void {
    this.store.dispatch(usersActionGetAll({
      sort: 'name'
    }))
    this.subscription = interval(1000).subscribe(console.log)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  createUser(form: NgForm) {
    this.store.dispatch(userCreateAction({
      payload: form.value
    }))
  }

  deleteUser(id: number) {
    this.store.dispatch(userDeleteAction({ id }))
  }
}
