import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Observable, map } from "rxjs";
import { User } from "../interfaces/user.interface";

export function emailExistsValidator() {
    const http = inject(HttpClient)
    return function (control: AbstractControl<string>): Observable<{ emailExists: boolean } | null> {
        return http.get<User>('https://jsonplaceholder.typicode.com/users/1').pipe(
            map(user => user.email == control.value ? { emailExists: true } : null)
        )
    }
}