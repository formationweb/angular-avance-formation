import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, DoCheck {
    title$: Observable<string> = this.appService.title$
    search: FormControl = new FormControl()
    responsive: boolean = true

    @Input() navbarConfig: any = {}

    count: number = 0

    constructor(
        private userService: UserService,
        private appService: AppService,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngDoCheck() {
        if (this.responsive != this.navbarConfig.responsive) {
            this.changeDetector.detectChanges()
        }
    }

    ngOnInit(): void {
        this.search.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((val) => {
                this.userService.setSearch(val)
            })

       /* setInterval(() => {
            this.count++
            if (this.count % 2 == 0) {
                this.changeDetector.detectChanges()
            }
        }, 1000)
        */
    }

    changeTitle() {
        this.appService.setTitle('' + Math.random()) // action
    }
}