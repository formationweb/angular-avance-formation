import { Component, OnInit, inject } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/user.interface';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
    users$: Observable<User[]> = this.userService.users$
    // private userService: UserService = inject(UserService)

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.search$.subscribe((str) => {
            console.log(str)
        })
        this.userService.getAll().subscribe()
    }

    createUser(form: NgForm) {
        this.userService.create(form.value).subscribe()
    }
}