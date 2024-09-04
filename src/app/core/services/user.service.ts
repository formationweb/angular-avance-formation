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