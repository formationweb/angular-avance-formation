import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, lastValueFrom, map, tap } from "rxjs";
import { User } from "../user.interface";
import { AbstractControl } from "@angular/forms";
import { BASE_URL } from "../constants/injection";
import { NotificationService } from "./notification.service";

type UserPayload = Omit<User, 'id'>

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _search$: BehaviorSubject<string> = new BehaviorSubject('')
    private _users$: BehaviorSubject<User[]> = new BehaviorSubject([] as User[])

    readonly url: string = '/users'
    readonly search$: Observable<string> = this._search$.asObservable()
    readonly users$: Observable<User[]> = this._users$.asObservable()

    constructor(
        private http: HttpClient,
        @Inject(BASE_URL) private baseUrl: string,
        private notification: NotificationService
    ) {
        this.url = this.baseUrl + this.url
    }

    setSearch(val: string) {
        this._search$.next(val)
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.url)
    }

    create(payload: UserPayload): Observable<User> {
        return this.http.post<User>(this.url, payload)
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(this.url + '/' + id)
    }

   /* checkEmail(input: AbstractControl<string>): Observable<{ emailExists: boolean } | null> {
        return this.http.get<User>(this.url + '/1')
            .pipe(
                map(user => input.value == user.email ? { emailExists: true } : null)
            )
    }

    */

    async checkEmail(input: AbstractControl<string>): Promise<{ emailExists: boolean } | null> {
        // this.http.get<User>(this.url + '/1').toPromise()
        const user = await lastValueFrom(this.http.get<User>(this.url + '/1'))
        return input.value == user.email ? { emailExists: true } : null    
    }
}