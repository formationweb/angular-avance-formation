import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { interval, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { CreateUserAction, DeleteUserAction, GetUsersAction } from 'src/app/store/users/users.action';
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
        this.store.dispatch(new CreateUserAction(form.value))
    }

    deleteUser(id: number) {
        this.store.dispatch(new DeleteUserAction(id))
    }
 
    ngOnDestroy() {
        this.subscription.unsubscribe()
    } 
}