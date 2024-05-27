import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { emailExistsValidator } from '../../core/validators/email-exists.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  propEmail = new FormControl<string>('', [
    Validators.required
  ], [
    emailExistsValidator()
  ]);
  propPass = new FormControl<string>('');
  form = new FormGroup({
    email: this.propEmail,
    password: this.propPass,
  });

  login() {
    this.auth
      .login(this.form.value.email!, this.form.value.password!)
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }
}
