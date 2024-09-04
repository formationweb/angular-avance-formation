import { Component, computed, effect, inject, OnInit, Signal, WritableSignal} from '@angular/core';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { UserService } from '../../core/services/user.service';
import { AsyncPipe } from '@angular/common';
import { User } from '../../core/interfaces/user';
import { UserCardComponent } from '../../features/user-card/user-card.component';
import { Observable } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserStates } from '../../store/users/users.reducer';
import { userGetAllAction } from '../../store/users/users.action';
import { selectUsersList } from '../../store/users/users.selector';
import { IStore } from '../../store/store.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, UserCardComponent, AsyncPipe, FormsModule /*, NgFor*/],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService)
  private store = inject<Store<IStore>>(Store)
  users$: Observable<User[]> = this.store.select(selectUsersList)
  username: Signal<string> = computed(() => this.userService.username().toUpperCase())
  
  constructor() {
    effect(() => {
      console.log(this.userService.username())
    })
  }
  
  ngOnInit(): void {
    // this.userService.getAll().subscribe() // action
    this.store.dispatch(userGetAllAction({
      sort: 'name'
    }))
  }

  createUser(form: NgForm) {
    this.userService.create(form.value).subscribe()
  }
}
