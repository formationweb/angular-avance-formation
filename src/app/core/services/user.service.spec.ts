import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('Users Service', () => {
  let userService: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    await TestBed.configureTestingModule({
        providers: [
            {
                provide: HttpClient,
                useValue: httpClientSpy
            }
        ]
    });
    httpClientSpy.get.and.returnValue(
        of([
            {
                id: 1,
                name: 'ana',
                email: 'ana@gmail.com',
                username: 'test'
            }
        ])
    )
    userService = TestBed.inject(UserService)
  });

  it('Tester la méthode getAll', () => {
    const ob$ = userService.getAll()
    ob$.subscribe((users) => {
        expect(users.length).toBeGreaterThan(0)
    })
  });
});
