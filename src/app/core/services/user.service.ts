import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { BehaviorSubject, catchError, lastValueFrom, map, Observable, retry, tap } from "rxjs";
import { User } from "../interfaces/user";
import { NotificationService } from "./notification.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly url: string = 'https://jsonplaceholder.typicode.com/users'
    private _search$: BehaviorSubject<string> = new BehaviorSubject('')
    readonly search$ = this._search$.asObservable()

    private _users$: BehaviorSubject<User[]> = new BehaviorSubject([] as User[])
    readonly users$: Observable<User[]> = this._users$.asObservable()

    constructor(
        private http: HttpClient,
        private notification: NotificationService
    ) {}

    setSearch(val: string) {
        this._search$.next(val)
    }

    getAll(sort?: string): Observable<User[]> {
        return this.http.get<User[]>(this.url + (sort ? '?_sort=' + sort : ''))
    }

    create(payload: Omit<User, 'id'>): Observable<User> {
        return this.http.post<User>(this.url, payload)
            .pipe(
                tap((userCreated: User) => {
                    const users = this._users$.value
                    this._users$.next([ ...users, userCreated ])
                    this.notification.success('Utilisateur créé !')
                }),
                catchError((err) => {
                    this.notification.error('Erreur')
                    throw err
                })
            )
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(this.url + '/' + id)
            .pipe(
                tap(() => {
                    const users = this._users$.value.filter(user => user.id != id)
                    this._users$.next(users)
                    this.notification.success('Utilisateur supprimé !')
                }),
                catchError((err) => {
                    this.notification.error('Erreur')
                    throw err
                })
            )
    }

    /*checkEmail(input: AbstractControl): Observable<{ emailExists: boolean } | null> {
        return this.http.get<User>(this.url + '/1')
            .pipe(
                map(user => user.email == input.value ? { emailExists: true } : null)
            )
    }*/

    /*checkEmail(input: AbstractControl): Promise<{ emailExists: boolean } | null> {
        return lastValueFrom(this.http.get<User>(this.url + '/1'))
            .then(user => user.email == input.value ? { emailExists: true } : null)
    }*/

    async checkEmail(input: AbstractControl): Promise<{ emailExists: boolean } | null> {
        const user = await lastValueFrom(this.http.get<User>(this.url + '/1'))
        return user.email == input.value ? { emailExists: true } : null
    }
}