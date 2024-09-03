import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly url = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);
  private _username = signal('');
  username = this._username.asReadonly();

  private _users = signal<User[]>([]);
  users = this._users.asReadonly();
  usersFiltered = computed(() =>
    this.users().filter((user) => user.name.includes(this.username()))
  );

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      tap((users) => {
        this._users.set(users); // mutation
      })
    );
  }

  create(payload: { name: string; email: string }): Observable<User> {
    return this.http.post<User>(this.url, payload).pipe(
      tap((user) => {
        const users = this.users();
        this._users.set([...users, user]);
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }

  setSearch(str: string) {
    this._username.set(str);
  }
}
