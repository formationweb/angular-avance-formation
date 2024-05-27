import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject, Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap
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

  create(payload: { name: string, email: string }): Observable<User> {
    return this.http.post<User>(this.url, payload)
      .pipe(
        tap((user) => {
          const users = this._users$.value
          this._users$.next([...users, user])
          this.notification.success('Utilisateur bien créé !')
        }),
        catchError((err) => {
          this.notification.error('Erreur')
          throw err
        })
      )
  }
}
