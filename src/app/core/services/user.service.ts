import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

export type UserPayload = Pick<User, 'email'> & Pick<User, 'name'>

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  readonly url = 'https://jsonplaceholder.typicode.com/users';
  private _valueSearch = signal('')
  valueSearch = this._valueSearch.asReadonly()
  // usersFiltered = computed(() => {
  //   return this.users()
  //     .filter(user => user.name.includes(this.valueSearch()))
  // })

  //constructor(private http: HttpClient) {}

  getAll(sort?: string): Observable<User[]> {
    return this.http.get<User[]>(this.url + (sort ? '?_sort=' + sort : ''))
  }

  create(payload: UserPayload): Observable<User> {
    return this.http.post<User>(this.url, payload)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id)
  }

  setSearch(str: string) {
    this._valueSearch.set(str)
  }
}
