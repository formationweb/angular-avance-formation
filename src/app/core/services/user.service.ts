import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, combineLatest, map, Observable, tap } from "rxjs";
import { User } from "../interfaces/user";
import { Store } from "@ngrx/store";
import { usersFeature } from "../../store/users/users.reducer";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly url = 'https://jsonplaceholder.typicode.com/users'
    private http = inject(HttpClient)
    private store = inject(Store)
    private _username = signal('')
    username = this._username.asReadonly()
    username$ = toObservable(this._username)
    usersFiltered$: Observable<User[]> = 
        combineLatest([ this.username$, this.store.select(usersFeature.selectUsersList) ])
            .pipe(
                map(([ str, users ]) => users.filter(user => user.name.includes(str)))
            )
    

    getAll(sort?: string): Observable<User[]> {
        return this.http.get<User[]>(this.url + (sort ? '?_sort=' + sort : ''))
    }

    create(payload: { name: string, email: string }): Observable<User> {
        return this.http.post<User>(this.url, payload)
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(this.url + '/' + id)
    }

    setSearch(str: string) {
        this._username.set(str)
    }
}