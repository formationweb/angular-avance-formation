import { Component } from '@angular/core';
import { NavbarComponent } from '../../features/navbar/navbar.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
