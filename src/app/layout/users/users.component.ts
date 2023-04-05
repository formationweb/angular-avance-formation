import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { interval, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { IStore } from 'src/app/store/store';
import { userCreate, userGetAll } from 'src/app/store/users/users.action';
import { selectUsersList } from 'src/app/store/users/users.selector';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
    users$: Observable<User[]> = this.store.select(selectUsersList)
    subscription!: Subscription
    mycolor: string = 'red'

    constructor(
        private userService: UserService,
        private store: Store<IStore>
    ) { }

    ngOnInit() { 
        /*this.subscription = interval(1000).subscribe((i) => {
            // console.log(i)
        })*/
        this.store.dispatch(userGetAll({ sort: 'name' }))
        this.userService.search$.subscribe((str: string) => {
            console.log(str)
        })
    }

    createUser(form: NgForm) {
        this.store.dispatch(userCreate({ body: form.value }))
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe()
    }
 
    ngOnDestroy() {
        this.subscription.unsubscribe()
    } 
}