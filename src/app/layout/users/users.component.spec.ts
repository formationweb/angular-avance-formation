import { HttpClientModule } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Observable, of } from 'rxjs'
import { User } from 'src/app/core/interfaces/user'
import { UserService } from 'src/app/core/services/user.service'
import { UserCardComponent } from './user-card/user-card.component'
import { UsersComponent } from './users.component'

/*@Injectable()
class UserServiceMock extends UserService {
    override getAll(): Observable<User[]> {
        return of([
            {
                id: 1,
                name: 'ana',
                email: 'ana@gmail.com'
            }
        ])
    }
}*/

const NAME = 'ana'

describe('Test UsersComponent', () => {
    let fixture: ComponentFixture<UsersComponent>
    let tpl: HTMLElement
    let component: UsersComponent
    let httpMock: HttpTestingController
    let userService: UserService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UsersComponent, UserCardComponent],
            imports: [HttpClientTestingModule],
            schemas: [NO_ERRORS_SCHEMA]
            /*providers: [{
                provide: UserService,
                useClass: UserServiceMock
            }]*/
        }).compileComponents()

        fixture = TestBed.createComponent(UsersComponent)
        httpMock = TestBed.inject(HttpTestingController)
        userService = TestBed.inject(UserService)
        tpl = fixture.nativeElement
        fixture.detectChanges() // exécute ngOnInit()
        await fixture.whenStable() // attendre que les notions async soient terminées
        component = fixture.componentInstance
    })

    it('Vérifier que liste des utilisateurs affichent bien dans le tpl', async () => {
        const requestHttp = httpMock.expectOne(userService.url)
        expect(requestHttp.request.method).toBe('GET')

        requestHttp.flush([
            {
                id: 1,
                name: NAME,
                email: 'ana@gmail.com'
            }
        ])

        fixture.detectChanges() // appliquer le tableau users au DOM
        
        const cards = tpl.querySelectorAll('app-user-card')
        expect(component.users.length).toBeGreaterThan(0)
        expect(cards.length).toBe(component.users.length)

        // test intégration
        const cardComponent = fixture.debugElement.query(By.directive(UserCardComponent))
        expect(cardComponent.componentInstance.user.name).toBe(NAME)
    })

    afterEach(() => {
        httpMock.verify()
    })
})