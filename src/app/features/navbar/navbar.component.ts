import { Component, OnInit, effect, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../core/services/app.service';
import { UserService } from './../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private appService = inject(AppService)
  private userService = inject(UserService)
  title = this.appService.title
  propSearch: FormControl<string> = new FormControl()

  constructor() {
    effect(() => {
      console.log(this.title())
    })
  }

  ngOnInit(): void {
    this.propSearch.valueChanges.subscribe((str) => {
      this.userService.setSearch(str)
    })
  }
}
