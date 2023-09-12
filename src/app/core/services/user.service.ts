import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, lastValueFrom, map } from "rxjs";
import { User } from "../user.interface";
import { AbstractControl } from "@angular/forms";
import { BASE_URL } from "../constants/injection";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly url: string = '/users'

    constructor(
        private http: HttpClient,
        @Inject(BASE_URL) private baseUrl: string
    ) {
        this.url = this.baseUrl + this.url
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.url)
    }

   /* checkEmail(input: AbstractControl<string>): Observable<{ emailExists: boolean } | null> {
        return this.http.get<User>(this.url + '/1')
            .pipe(
                map(user => input.value == user.email ? { emailExists: true } : null)
            )
    }

    */

    checkEmail(input: AbstractControl<string>): Promise<{ emailExists: boolean } | null> {
        // this.http.get<User>(this.url + '/1').toPromise()
        return lastValueFrom(this.http.get<User>(this.url + '/1'))
            .then(user => input.value == user.email ? { emailExists: true } : null)
    }
}