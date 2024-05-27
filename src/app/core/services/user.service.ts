import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
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
 
  users = signal<User[]>([])
  nbUsersByName = computed<number>(() => {
    return this.users()
      .filter(users => users.name.startsWith('Leanne'))
      .length
  })

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
    return this.http.get<User[]>(this.url)
      .pipe(
        tap((users) => {
          this.users.set(users)
        })
      )
  }

  create(payload: { name: string, email: string }): Observable<User> {
    return this.http.post<User>(this.url, payload)
      .pipe(
        tap((user) => {
          this.users.set([...this.users(), user])
          this.notification.success('Utilisateur bien créé !')
        }),
        catchError((err) => {
          this.notification.error('Erreur')
          throw err
        })
      )
  }
}
