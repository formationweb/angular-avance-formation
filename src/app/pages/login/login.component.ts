import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginPayload } from '../../core/services/auth.service';
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

  /*propEmail = new FormControl('', [
    Validators.required
  ], [
    emailExistsValidator()
  ])*/
  propEmail = new FormControl('', {
    asyncValidators: [emailExistsValidator()],
    validators: [Validators.required],
   // updateOn: 'blur'
  });
  propPass = new FormControl();
  myForm = new FormGroup({
    email: this.propEmail,
    password: this.propPass,
  });

  login() {
    this.auth.login(this.myForm.value as LoginPayload).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
