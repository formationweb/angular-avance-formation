import { Component, inject, OnInit} from '@angular/core';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { UserService } from '../../core/services/user.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { User } from '../../core/interfaces/user';
import { UserCardComponent } from '../../features/user-card/user-card.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, UserCardComponent, AsyncPipe /*, NgFor*/],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService)
  users$: Observable<User[]> = this.userService.users$
  
  ngOnInit(): void {
    this.userService.getAll().subscribe() // action
    this.userService.username.subscribe((str) => {
      console.log(str)
    })
  }
}
