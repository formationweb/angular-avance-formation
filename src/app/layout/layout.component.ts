import { Component } from "@angular/core";

@Component({
    selector: 'app-layout',
    template: `
        <app-navbar [navbarConfig]="layoutConfig"></app-navbar>
        <button (click)="changeVersion()">Modifier Version</button>
        <router-outlet></router-outlet>
    `
})
export class LayoutComponent {
    layoutConfig: any = {
        responsive: true,
        version: 1
    }

    changeVersion() {
        this.layoutConfig.version = Math.random()
    }
}