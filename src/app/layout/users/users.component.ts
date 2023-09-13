import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, interval } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/user.interface';
import { GetUsersAction } from 'src/app/store/users.action';
import { UserState } from 'src/app/store/users.state';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
    @Select(UserState.getUsersList) users$!: Observable<User[]> 
    subscription!: Subscription
    color: string = 'red'
    // private userService: UserService = inject(UserService)

    constructor(
        private userService: UserService,
        private store: Store
    ) { }

    ngOnInit() {
        this.userService.search$.subscribe((str) => {
            console.log(str)
        })
        this.store.dispatch(new GetUsersAction('name'))

        /*this.subscription = interval(1000).subscribe((nb) => {
            console.log(nb)
        })*/
    }

    createUser(form: NgForm) {
        this.userService.create(form.value).subscribe()
    }

    deleteUtilisateur(id: number) {
        this.userService.delete(id).subscribe()
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe()
    }
}