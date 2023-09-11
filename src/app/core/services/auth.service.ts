import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

type LoginPayload = { email: string, password: string }
type LoginResponse = { token: string }

const KEY_STORAGE = 'angular'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url: string = 'https://reqres.in/api/login'
  constructor(private http: HttpClient) { }

  login(payload: LoginPayload): Observable<LoginResponse> {
     return this.http.post<LoginResponse>(this.url, payload)
      .pipe(
        tap((res: LoginResponse) => {
           this.token = res.token
        })
      )
  }

  set token(val: string) {
    localStorage.setItem(KEY_STORAGE, val)
  }

  get token(): string {
    return localStorage.getItem(KEY_STORAGE) ?? ''
  }

}
