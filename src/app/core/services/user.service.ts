import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject, Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  map
} from 'rxjs';
import { User } from '../interfaces/user.interface';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly url = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);
  private notification = inject(NotificationService)
  private _search$: BehaviorSubject<string> = new BehaviorSubject('');

  search$: Observable<string> = this._search$.asObservable().pipe(
    filter((str) => str.length > 3),
    map((str) => str.toUpperCase()),
    debounceTime(500),
    distinctUntilChanged()
  );

  setSearch(str: string) {
    this._search$.next(str);
  }

  // constructor(private http: HttpClient) {}

  getAll(sort?: string): Observable<User[]> {
    return this.http.get<User[]>(this.url + (sort ? '?_sort=' + sort : ''))
  }

  create(payload: { name: string, email: string }): Observable<User> {
    return this.http.post<User>(this.url, payload)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id)
  }
}
