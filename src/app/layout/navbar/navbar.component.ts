import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {
    title$: Observable<string> = this.appService.title$
    search: FormControl = new FormControl()

    constructor(
        private userService: UserService,
        private appService: AppService
    ) {}

    ngOnInit(): void {
        this.search.valueChanges
        .pipe(
            debounceTime(500),
            distinctUntilChanged()
        )
        .subscribe((val) => {
            this.userService.setSearch(val)
        })
    }

    changeTitle() {
        this.appService.setTitle(''+Math.random()) // action
    }
}