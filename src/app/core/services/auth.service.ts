import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

type LoginPayload = { email: string, password: string }
type TokenResponse = { token: string }

const ANGULAR_KEY_STORAGE = 'angular-token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url = 'https://reqres.in/api/login'

  constructor(private http: HttpClient) { }

  login(payload: LoginPayload): Observable<TokenResponse> {
     return this.http.post<TokenResponse>(this.url, payload)
      .pipe(
         tap((res: TokenResponse) => {
              this.token = res.token
         })
      )
  }

  set token(val: string) {
     localStorage.setItem(ANGULAR_KEY_STORAGE, val)
  }

  get token(): string {
    return localStorage.getItem(ANGULAR_KEY_STORAGE) as string
  }
}
