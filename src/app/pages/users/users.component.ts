import { Component, computed, effect, inject, OnInit, Signal, WritableSignal} from '@angular/core';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { UserService } from '../../core/services/user.service';
import { AsyncPipe } from '@angular/common';
import { User } from '../../core/interfaces/user';
import { UserCardComponent } from '../../features/user-card/user-card.component';
import { Observable } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UserState } from '../../store/users/users.state';
import { UserCreateAction, UsersGetAllAction } from '../../store/users/users.action';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, UserCardComponent, AsyncPipe, FormsModule /*, NgFor*/],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService)
  private store = inject(Store)
  users$: Observable<User[]> = this.store.select(UserState.getUsersList)
  username: Signal<string> = computed(() => this.userService.username().toUpperCase())
  
  constructor() {
    effect(() => {
      console.log(this.userService.username())
    })
  }
  
  ngOnInit(): void {
    this.store.dispatch(new UsersGetAllAction('name'))
  }

  createUser(form: NgForm) {
    this.store.dispatch(new UserCreateAction(form.value))
  }
}
