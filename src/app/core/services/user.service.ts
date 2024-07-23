import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  readonly url = 'https://jsonplaceholder.typicode.com/users';
  private _users = signal<User[]>([])
  private _valueSearch = signal('')

  users = this._users.asReadonly()
  valueSearch = this._valueSearch.asReadonly()
  usersFiltered = computed(() => {
    return this.users()
      .filter(user => user.name.includes(this.valueSearch()))
  })

  //constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      tap((users) => {
        this._users.set(users)
      })
    )
  }

  setSearch(str: string) {
    this._valueSearch.set(str)
  }
}
