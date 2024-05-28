import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../core/interfaces/user.interface';
import { UserService } from '../../core/services/user.service';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { UserCardComponent } from '../../features/user-card/user-card.component';
import { IStore } from '../../store/store.interface';
import { userGetAllAction } from '../../store/users/users.action';
import { selectUsersList } from '../../store/users/users.selector';
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
  private store = inject<Store<IStore>>(Store)
  users$: Observable<User[]> = this.store.select(selectUsersList);
  search$: Observable<string> = this.userService.search$;
  colorSelected = ''

  ngOnInit() {
    this.store.dispatch(userGetAllAction())
  }

  createUser(form: NgForm) {
   
  }

  deleteUser(id: number) {
   
  }
}
