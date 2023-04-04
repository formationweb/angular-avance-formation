import { Component, OnDestroy, OnInit } from '@angular/core'
import { interval, Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
    users: User[] = []
    subscription!: Subscription

    constructor(private userService: UserService) { }

    ngOnInit() { 
        this.subscription = interval(1000).subscribe((i) => {
            // console.log(i)
        })
        this.userService.getAll().subscribe((users: User[]) => {
            this.users = users
        })
        this.userService.search$.subscribe((str: string) => {
            console.log(str)
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    } 
}