import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject, Observable,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map
} from 'rxjs';
import { IStore } from '../../store/store.interface';
import { selectUsersList } from '../../store/users/users.selector';
import { User } from '../interfaces/user.interface';

export type UserCreatePayload = { name: string, email: string }

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly url = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);
  private _search$: BehaviorSubject<string> = new BehaviorSubject('');
  private store = inject<Store<IStore>>(Store);

  search$: Observable<string> = this._search$.asObservable().pipe(
    debounceTime(500),
    distinctUntilChanged()
  );

  usersFiltered$: Observable<User[]> = 
    combineLatest([ this.search$, this.store.select(selectUsersList) ])
    .pipe(
      map(([ str, users ]) => {
        if (!str) {
          return users
        }
        return users.filter(user => user.name.includes(str))
      })
    )

  setSearch(str: string) {
    this._search$.next(str);
  }

  // constructor(private http: HttpClient) {}

  getAll(sort?: string): Observable<User[]> {
    return this.http.get<User[]>(this.url + (sort ? '?_sort=' + sort : ''))
  }

  create(payload: UserCreatePayload): Observable<User> {
    return this.http.post<User>(this.url, payload)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id)
  }
}
