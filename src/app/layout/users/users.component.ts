import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { interval, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { GetUsersAction } from 'src/app/store/users/users.action';
import { UserState } from 'src/app/store/users/users.state';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
    @Select(UserState.getUsersList) users$!: Observable<User[]>
    subscription!: Subscription
    mycolor: string = 'red'

    constructor(
        private userService: UserService,
        private store: Store
    ) { }

    ngOnInit() { 
        /*this.subscription = interval(1000).subscribe((i) => {
            // console.log(i)
        })*/
        this.store.dispatch(new GetUsersAction('name'))
        this.userService.search$.subscribe((str: string) => {
            console.log(str)
        })
    }

    createUser(form: NgForm) {
        this.userService.create(form.value).subscribe()
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe()
    }
 
    ngOnDestroy() {
        this.subscription.unsubscribe()
    } 
}