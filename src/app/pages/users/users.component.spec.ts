import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { UsersComponent } from './users.component'

describe('UsersComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UsersComponent, HttpClientModule]
        }).compileComponents()
    })

    it('Vérifier que users n\'est pas vide', async () => {
        const fixture = TestBed.createComponent(UsersComponent)
        const el: HTMLElement = fixture.nativeElement
        const component = fixture.componentInstance
        fixture.detectChanges() // lance le premier cycle, donc ngOnInit est appelé
        await fixture.whenStable() // attend que les appels asynchrones soient terminés
        fixture.detectChanges() // lance le deuxième cycle, donc la vue est mise à jour
        
        const elDiv = el.querySelectorAll('.user-card')

        expect(component.users.length).toBeGreaterThan(0)
        expect(elDiv.length).toBe(component.users.length)
    })
})