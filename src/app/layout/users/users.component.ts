import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Observable, Subscription, interval } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/user.interface';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
    users$: Observable<User[]> = this.userService.users$
    subscription!: Subscription
    // private userService: UserService = inject(UserService)

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.search$.subscribe((str) => {
            console.log(str)
        })
        this.userService.getAll().subscribe()

        /*this.subscription = interval(1000).subscribe((nb) => {
            console.log(nb)
        })*/
    }

    createUser(form: NgForm) {
        this.userService.create(form.value).subscribe()
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe()
    }
}