import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

type LoginResponse = {
  token: string;
};

const KEY = 'angular'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly url = 'https://reqres.in/api/login';
  private http = inject(HttpClient);

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url, { email, password })
      .pipe(
        tap((res: LoginResponse) => {
          this.token = res.token
        })
      )
  }

  set token(val: string) {
    localStorage.setItem(KEY, val)
  }

  get token() {
    return localStorage.getItem(KEY) as string
  }
}
