import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UsersComponent } from './users.component'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Observable, of } from 'rxjs'
import { UserService } from 'src/app/core/services/user.service'
import { User } from 'src/app/core/user.interface'

/*
class UserServiceMock extends UserService {
    override getAll(): Observable<User[]> {
        return of([
            {
                id: 1,
                email: 'ana@gmail.com',
                username: 'ana',
                name: 'ana'
            }
        ])
    }
}
*/

describe('Tester UsersComponent', () => {
    let fixture: ComponentFixture<UsersComponent>
    let component: UsersComponent
    let tpl: HTMLElement
    let httpMock: HttpTestingController
    let userService: UserService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [UsersComponent],
            /*providers: [{
                provide: UserService,
                useClass: UserServiceMock
            }]
            */
        }).compileComponents()

        fixture = TestBed.createComponent(UsersComponent)
        httpMock = TestBed.inject(HttpTestingController)
        userService = TestBed.inject(UserService)

        fixture.detectChanges() // déclenche ngOnInit
        await fixture.whenStable() // attendre que notions async. terminées
        component = fixture.componentInstance
        tpl = fixture.nativeElement
    })

    it('La liste utilisateurs s\'affiche bien !', async () => {
        const requestHttp = httpMock.expectOne(userService.url)
        expect(requestHttp.request.method).toBe('GET')

        requestHttp.flush([
            {
                id: 1,
                email: 'ana@gmail.com',
                username: 'ana',
                name: 'ana'
            }
        ])

        fixture.detectChanges() // appliquer le tableau users au DOM
        
        const articles = tpl.querySelectorAll('article')
        expect(component.users.length).toBeGreaterThan(0)
        expect(articles.length).toBe(component.users.length)
    })

    afterEach(() => {
        httpMock.verify()
    })
})