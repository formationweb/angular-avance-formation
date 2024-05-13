import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('Tester UserService', () => {
  let userService: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ],
    });
    userService = TestBed.inject(UserService);
  });

  it('Tester la méthode getAll', () => {
    userService.getAll()
    expect(httpClientSpy.get).toHaveBeenCalled()
  });
});
