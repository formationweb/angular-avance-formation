import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UsersComponent } from './users.component';

/*class UserServiceMock {
  getAll(): Observable<User[]> {
    return of([
      {
        id: 1,
        name: 'test',
        email: 'test@test.gmail.com',
      },
    ]);
  }
}*/

describe('UsersComponent', () => {
  let fixture: ComponentFixture<UsersComponent>;
  let el: HTMLElement;
  let component: UsersComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      imports: [UsersComponent, HttpClientModule],
      providers: [
        /*{
          provide: UserService,
          useClass: UserServiceMock,
        },*/
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ],
    }).compileComponents();

    httpClientSpy.get.and.returnValue(
      of([
        {
          id: 1,
          name: 'test',
          email: 'test@test.gmail.com',
        },
      ])
    );

    fixture = TestBed.createComponent(UsersComponent);
    el = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges(); // lance le premier cycle, donc ngOnInit est appelé
    await fixture.whenStable(); // attend que les appels asynchrones soient terminés
    fixture.detectChanges(); // lance le deuxième cycle, donc la vue est mise à jour
  });

  it("Vérifier que users n'est pas vide", async () => {
    const elDiv = el.querySelectorAll('.user-card');
    expect(component.users.length).toBeGreaterThan(0);
    expect(elDiv.length).toBe(component.users.length);
  });
});
