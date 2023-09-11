import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UsersComponent } from './users.component'
import { HttpClientModule } from '@angular/common/http'

describe('Tester UsersComponent', () => {
    let fixture: ComponentFixture<UsersComponent>
    let component: UsersComponent
    let tpl: HTMLElement

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule],
            declarations: [UsersComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(UsersComponent)
        fixture.detectChanges() // déclenche ngOnInit
        await fixture.whenStable() // attendre que notions async. terminées
        fixture.detectChanges() // appliquer le tableau users au DOM
        component = fixture.componentInstance
        tpl = fixture.nativeElement
    })

    it('La liste utilisateurs s\'affiche bien !', async () => {
        const articles = tpl.querySelectorAll('article')
        expect(component.users.length).toBeGreaterThan(0)
        expect(articles.length).toBe(component.users.length)
    })
})