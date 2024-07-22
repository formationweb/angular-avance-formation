import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

const KEY = 'angular'

export type LoginPayload = {
  email: string
  password: string
}

type TokenResponse = {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url = 'https://reqres.in/api/login'
  private http = inject(HttpClient)

  login(payload: LoginPayload): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(this.url, payload)
      .pipe(
        tap((res) => {
          this.token = res.token
        })
      )
  }

  get token() {
    return localStorage.getItem(KEY) ?? ''
  }

  set token(val: string) {
    localStorage.setItem(KEY, val)
  }
}
