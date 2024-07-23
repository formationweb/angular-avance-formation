import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AppService } from '../../core/services/app.service';
import { UserService } from './../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private appService = inject(AppService)
  private userService = inject(UserService)
  title$ = this.appService.title$
  propSearch: FormControl<string> = new FormControl()

  ngOnInit(): void {
    this.propSearch.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe((str) => {
      console.log(str)
      this.userService.setSearch(str)
    })
  }

  changeTitle() {
    this.appService.setTitle('Nouveau titre') // action
  }
}
