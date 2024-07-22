import { Component, effect, inject } from '@angular/core';
import { AppService } from '../../core/services/app.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private appService = inject(AppService)
  title = this.appService.title

  constructor() {
    effect(() => {
      console.log(this.title())
    })
  }
}
