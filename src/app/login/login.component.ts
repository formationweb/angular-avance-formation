import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   propEmail: FormControl = new FormControl('eve.holt@reqres.in')
   propPass: FormControl = new FormControl()
   form: FormGroup = this.builder.group({
     email: this.propEmail,
     password: this.propPass
   })

   constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

   login() {
    this.auth.login(this.form.value).subscribe(() => {
        this.router.navigateByUrl('/')
    })
   }
}
