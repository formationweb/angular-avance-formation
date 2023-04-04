import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {
    title$: Observable<string>  = this.appService.title$
    search: FormControl = new FormControl()

    constructor(
        private userService: UserService,
        private appService: AppService
    ) {}

    ngOnInit() {
        this.search.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((str) => {
                this.userService.setSearch(str)
            })
    }

    changeTitle() {
        this.appService.setTitle(''+Math.random()) // action
    }
}