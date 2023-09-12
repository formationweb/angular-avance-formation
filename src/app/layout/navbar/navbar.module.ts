import { NgModule } from '@angular/core'
import { NavbarComponent } from './navbar.component'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [NavbarComponent],
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    exports: [NavbarComponent]
})
export class NavbarModule {}