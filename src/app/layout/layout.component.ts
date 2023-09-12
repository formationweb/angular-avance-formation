import { Component } from "@angular/core";

@Component({
    selector: 'app-layout',
    template: `
        <app-navbar [navbarConfig]="layoutConfig"></app-navbar>
        <button (click)="changeConfig()">Changer configuration</button>
        <router-outlet></router-outlet>
    `
})
export class LayoutComponent {
    layoutConfig: any = {
        responsive: true,
        version: '1.0.0'
    }

    changeConfig() {
        //this.layoutConfig.version = ''+Math.random()
        this.layoutConfig.responsive = false
    }
}