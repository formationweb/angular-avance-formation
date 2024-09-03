import { Component, computed, effect, inject, OnInit, Signal, WritableSignal} from '@angular/core';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { UserService } from '../../core/services/user.service';
import { AsyncPipe } from '@angular/common';
import { User } from '../../core/interfaces/user';
import { UserCardComponent } from '../../features/user-card/user-card.component';
import { Observable } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, UserCardComponent, AsyncPipe, FormsModule /*, NgFor*/],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService)
  users$: Observable<User[]> = this.userService.users$
  username: Signal<string> = computed(() => this.userService.username().toUpperCase())
  
  constructor() {
    effect(() => {
      console.log(this.userService.username())
    })
  }
  
  ngOnInit(): void {
    this.userService.getAll().subscribe() // action
  }

  createUser(form: NgForm) {
    this.userService.create(form.value).subscribe()
  }
}
