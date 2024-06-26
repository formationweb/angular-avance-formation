import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Observable, map, switchMap, timer } from "rxjs";
import { User } from "../interfaces/user.interface";

export function emailExistsValidator() {
    const http = inject(HttpClient)
    return function(control: AbstractControl<string>): Observable<{ emailExists: boolean } | null> {
        return timer(500).pipe(
            switchMap(() => {
                return http.get<User>('https://jsonplaceholder.typicode.com/users/1')
            }),
            map(user => user.email == control.value ? { emailExists: true } : null)
        )
    }
}