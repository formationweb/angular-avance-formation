import { Component, OnInit, inject } from '@angular/core'
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/user.interface';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
    users: User[] = []
    // private userService: UserService = inject(UserService)

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.search$.subscribe((str) => {
            console.log(str)
        })
        this.userService.getAll().subscribe((users: User[]) => {
            this.users = users
        })
    }
}