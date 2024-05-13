import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

type LoginResponse = {
  token: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly url = 'https://reqres.in/api/login';
  private http = inject(HttpClient);
  token = ''

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url, { email, password })
      .pipe(
        tap((res: LoginResponse) => {
          this.token = res.token
        })
      )
  }
}
