import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  propEmail: FormControl = new FormControl('eve.holt@reqres.in', [
    Validators.required // { required: true } | null
  ], [
    this.userService.checkEmail.bind(this.userService)
  ])
  propPass: FormControl = new FormControl()
  form: FormGroup = this.builder.group({
    email: this.propEmail,
    password: this.propPass
  })

  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  login() {
    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
