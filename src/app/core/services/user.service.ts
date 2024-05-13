// https://jsonplaceholder.typicode.com/users

import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly url = 'https://jsonplaceholder.typicode.com/users'
    private http = inject(HttpClient)
   // constructor(private http: HttpClient) {}

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.url)
    }
}