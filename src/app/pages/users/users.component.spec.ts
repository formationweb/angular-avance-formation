import { HttpClient, provideHttpClient } from "@angular/common/http"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { of } from "rxjs"
import { UsersComponent } from "./users.component"

/*
class UserServiceMock {
    getAll(): Observable<User[]> {
        return of([
            {
                id: 1,
                name: 'ana',
                email: 'ana@gmail.com'
            }
        ])
    }
}
*/

describe('Users Component', () => {
    let fixture: ComponentFixture<UsersComponent>
    let component: UsersComponent
    let elView: HTMLElement
    let httpClientSpy: jasmine.SpyObj<HttpClient>

    beforeEach(async () => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])

        await TestBed.configureTestingModule({
            imports: [UsersComponent],
            providers: [
                provideHttpClient(),
               /* {
                    provide: UserService,
                    useClass: UserServiceMock
                }*/
               {
                provide: HttpClient,
                useValue: httpClientSpy
               }
            ]
        }).compileComponents()

        httpClientSpy.get.and.returnValue(
            of([
                {
                    id: 1,
                    name: 'ana',
                    email: 'ana@gmail.com'
                }
            ])
        )

        fixture = TestBed.createComponent(UsersComponent)
        component = fixture.componentInstance
        elView = fixture.nativeElement
        fixture.detectChanges() // déclenche ngOnInit
        await fixture.whenStable() // attendre  notion async. terminée
        fixture.detectChanges() // relancer le cycle pour appliquer le array users dans la vue
    })

    it('users est un tableau non vide', async () => {
        const elArticles = elView.querySelectorAll('article')
        component.users$.subscribe((users) => {
            expect(users.length).toBeGreaterThan(0)
            expect(elArticles.length).toBe(users.length)
        })
    })
})