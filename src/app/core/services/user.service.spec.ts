import { provideHttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { UserService } from './user.service';

describe('User Service', () => {
    let userService: UserService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient()
            ]
        })
        userService = TestBed.inject(UserService)
    })

    it('GetAll existe', () => {
        expect(userService.getAll).toBeDefined()
    })
})