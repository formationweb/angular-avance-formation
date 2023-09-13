import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, interval } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/user.interface';
import { IStore } from 'src/app/store/store';
import { UserActions, userCreateAction, userDeleteAction, userGetAll } from 'src/app/store/users/users.action';
import { UserState } from 'src/app/store/users/users.reducer';
import { selectUsersList } from 'src/app/store/users/users.selector';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
    users$: Observable<User[]> = this.userService.usersFiltered$
    
    subscription!: Subscription
    color: string = 'red'
    // private userService: UserService = inject(UserService)

    constructor(
        private userService: UserService,
        private store: Store<IStore>
    ) { }

    ngOnInit() {
        this.userService.search$.subscribe((str) => {
            console.log(str)
        })
       
        this.store.dispatch(userGetAll({ sort: 'name' }))

        /*this.subscription = interval(1000).subscribe((nb) => {
            console.log(nb)
        })*/
    }

    createUser(form: NgForm) {
        this.store.dispatch(userCreateAction({ form: form.value }))
    }

    deleteUtilisateur(id: number) {
       this.store.dispatch(userDeleteAction({ userId: id }))
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe()
    }
}