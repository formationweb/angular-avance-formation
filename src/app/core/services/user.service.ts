import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject, Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap
} from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly url = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);
  private _search$: BehaviorSubject<string> = new BehaviorSubject('');
  private _users$: BehaviorSubject<User[]> = new BehaviorSubject([] as User[]) // state

  search$: Observable<string> = this._search$.asObservable().pipe(
    filter((str) => str.length > 3),
    map((str) => str.toUpperCase()),
    debounceTime(500),
    distinctUntilChanged()
  );
  users$: Observable<User[]> = this._users$.asObservable() // getter or selector

  setSearch(str: string) {
    this._search$.next(str);
  }

  // constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
      .pipe(
        tap((users) => {
          this._users$.next(users) // mutation
        })
      )
  }
}
