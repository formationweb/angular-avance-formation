import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { selectUsersList } from '../../store/users/users.selector';
import { User } from '../interfaces/user.interface';

export type UserPayload = Pick<User, 'email'> & Pick<User, 'name'>;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private store = inject(Store);

  readonly url = 'https://jsonplaceholder.typicode.com/users';
  private _valueSearch$ = new BehaviorSubject('');
  valueSearch$ = this._valueSearch$.asObservable();
  users$ = this.store.select(selectUsersList);
  usersFiltered$: Observable<User[]> = combineLatest([
    this.valueSearch$,
    this.users$,
  ]).pipe(
    map(([str, users]) => users.filter((user) => user.name.includes(str)))
  );

  getAll(sort?: string): Observable<User[]> {
    return this.http.get<User[]>(this.url + (sort ? '?_sort=' + sort : ''));
  }

  create(payload: UserPayload): Observable<User> {
    return this.http.post<User>(this.url, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }

  setSearch(str: string) {
    this._valueSearch$.next(str);
  }
}
