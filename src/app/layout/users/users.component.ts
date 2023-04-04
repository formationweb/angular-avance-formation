import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { interval, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
    users$: Observable<User[]> = this.userService.users$
    subscription!: Subscription

    constructor(private userService: UserService) { }

    ngOnInit() { 
        this.subscription = interval(1000).subscribe((i) => {
            // console.log(i)
        })
        this.userService.getAll().subscribe()
        this.userService.search$.subscribe((str: string) => {
            console.log(str)
        })
    }

    createUser(form: NgForm) {
        this.userService.create(form.value).subscribe()
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    } 
}