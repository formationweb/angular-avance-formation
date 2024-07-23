import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { NotificationService } from './notification.service';

export type UserPayload = Pick<User, 'email'> & Pick<User, 'name'>

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private notification = inject(NotificationService)
  readonly url = 'https://jsonplaceholder.typicode.com/users';
  private _users$ = new BehaviorSubject<User[]>([])
  private _valueSearch = signal('')
  users$ = this._users$.asObservable()
  valueSearch = this._valueSearch.asReadonly()
  // usersFiltered = computed(() => {
  //   return this.users()
  //     .filter(user => user.name.includes(this.valueSearch()))
  // })

  //constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      tap((users) => {
        //const usersList = this._users$.value
        this._users$.next(users)
      })
    )
  }

  create(payload: UserPayload): Observable<User> {
    return this.http.post<User>(this.url, payload).pipe(
      tap((user) => {
        const usersList = this._users$.value
        this._users$.next([ ...usersList, user ])
        this.notification.success('Utilisateur bien créé')
      }),
      catchError((err) => {
        this.notification.error('Erreur')
        throw err
      })
    )
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id).pipe(
      tap(() => {
        const usersFiltered = this._users$.value.filter(user => user.id != id)
        this._users$.next(usersFiltered)
        this.notification.success('Utilisateur bien supprimé')
      }),
      catchError((err) => {
        this.notification.error('Erreur')
        throw err
      })
    )
  }

  setSearch(str: string) {
    this._valueSearch.set(str)
  }
}
