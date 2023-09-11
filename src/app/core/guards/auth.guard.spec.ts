import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

describe('UserCardComponent', () => {
    let authService: AuthService

    const routerMock = {
        navigateByUrl: jasmine.createSpy('navigateByUrl')
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                { provide: Router, useValue: routerMock }
            ]
        });
        authService = TestBed.inject(AuthService)
    });

    it('Tester si on a token', () => {
        authService.token = 'aa'
        const ret = TestBed.runInInjectionContext(authGuard);
        expect(ret).toBe(true)
    })

    it('Tester si on n\'a pas token', () => {
        authService.token = ''
        const ret = TestBed.runInInjectionContext(authGuard);
        expect(ret).toBe(false)
        expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login')
    })
});
