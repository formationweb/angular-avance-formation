import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginPayload } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private auth = inject(AuthService)
  private router = inject(Router)

  propEmail = new FormControl()
  propPass = new FormControl()
  myForm = new FormGroup({
    email: this.propEmail,
    password: this.propPass
  })

  login() {
    this.auth.login(this.myForm.value as LoginPayload).subscribe(() => {
      this.router.navigateByUrl('/')
    })
  }
}
