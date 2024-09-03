import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { User } from "../interfaces/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly url = 'https://jsonplaceholder.typicode.com/users'
    private http = inject(HttpClient)
    username = new BehaviorSubject<string>('')
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
}