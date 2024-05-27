import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
    BehaviorSubject,
    Observable,
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
} from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly url = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);

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

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
}
