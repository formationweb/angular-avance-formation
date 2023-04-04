import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, DoCheck {
    title$: Observable<string>  = this.appService.title$
    search: FormControl = new FormControl()
    count: number = 0
    countEven: number = 0
    responsive: boolean = true

    @Input() navbarConfig: any = {}

    constructor(
        private userService: UserService,
        private appService: AppService,
        private zone: NgZone,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngDoCheck() {
       if (this.responsive != this.navbarConfig.responsive) {
        this.changeDetectorRef.detectChanges()
       }
    }

    ngOnInit() {
        this.responsive = this.navbarConfig.responsive
        this.search.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((str) => {
                this.userService.setSearch(str)
            })

       /* this.zone.runOutsideAngular(() => {
            setInterval(() => {
                this.count++
                if (this.count % 2 == 0) {
                    this.countEven = this.count
                   // this.changeDetectorRef.detectChanges()
                }
            }, 1000)
        })*/
    }

    changeTitle() {
        this.appService.setTitle(''+Math.random()) // action
    }
}