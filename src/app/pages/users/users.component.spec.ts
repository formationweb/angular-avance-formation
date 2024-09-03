import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from '../../core/services/user.service';
import { Observable, of } from 'rxjs';
import { User } from '../../core/interfaces/user';

class UserServiceMock {
    getAll(): Observable<User[]> {
        return of([
            {
                id: 1,
                name: 'ana',
                email: 'ana@gmail.com',
                username: 'test'
            }
        ])
    }
}

describe('Users Component', () => {
  let fixture: ComponentFixture<UsersComponent>;
  let component: UsersComponent;
  let view: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [provideHttpClient(), {
        provide: UserService,
        useClass: UserServiceMock
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    view = fixture.nativeElement;

    fixture.detectChanges(); // lancement ngOnInit
    await fixture.whenStable();
    fixture.detectChanges(); // appliquer le users non vide dans le DOM
  });

  it('Tester si users non vide', async () => {
    const elArticles = view.querySelectorAll('article');
    expect(component.users.length).toBeGreaterThan(0);
    expect(elArticles.length).toBe(component.users.length);
  });
});
