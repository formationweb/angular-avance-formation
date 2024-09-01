import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav>
      {{ title }}
    </nav>
  `
})
export class NavbarComponent {
  title = 'My App';
}
