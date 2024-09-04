import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  template: `
    @if (suggestions.length > 0) {
      <ul>
        @for (suggestion of suggestions(); track suggestion) {
          <li>{{ suggestion }}</li>
        }
      </ul>
    }
  `
})
export class SuggestionsComponent implements OnInit, OnDestroy {
  loading = input.required<boolean>()
  suggestions = signal<string[]>([])

  ngOnInit() {
    
  }

  ngOnDestroy() {
   
  }

  search(term: string) {
    
  }
}


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, SuggestionsComponent],
  template: `
    <nav>
      {{ title }}
      <input type="text" [(ngModel)]="username"><button (click)="search()">Rechercher</button>
      <app-suggestions [loading]="loading"></app-suggestions>
    </nav>
  `
})
export class NavbarComponent {
  loading = false
  private userService = inject(UserService)
  title = 'My App';
  username = ''

  search() {
    this.userService.setSearch(this.username)
  }
}
