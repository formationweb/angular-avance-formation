import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { BehaviorSubject, catchError, Observable, tap } from "rxjs";
import { User } from "../interfaces/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly url = 'https://jsonplaceholder.typicode.com/users'
    private http = inject(HttpClient)
    private _username = signal('')
    username = this._username.asReadonly()
   
    private _users$ = new BehaviorSubject<User[]>([]) // state
    users$ = this._users$.asObservable() // getter ou selector

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
               this._users$.next([
                ...users,
                user
               ])
            }),
            catchError((err) => {
                console.log(err)
                throw err
            })
        )
    }

    setSearch(str: string) {
        this._username.set(str)
    }
}