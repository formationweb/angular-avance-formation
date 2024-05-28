import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import {
  Observable,
  catchError,
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

  users = signal<User[]>([])
  search = signal('')
  usersFiltered = computed(() => {
    return this.users().filter(user => user.name.includes(this.search()))
  })

  nbUsersByName = computed<number>(() => {
    return this.users()
      .filter(users => users.name.startsWith('Leanne'))
      .length
  })

  setSearch(str: string) {
    this.search.set(str)
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
