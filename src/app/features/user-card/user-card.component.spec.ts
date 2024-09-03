import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';
import { User } from '../../core/interfaces/user';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let view: HTMLElement;
  let user: User = {
    id: 1,
    name: 'ana',
    email: 'ana@gmail.com',
    username: 'test',
  } as User;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    view = fixture.nativeElement
    component.user = user
    fixture.detectChanges();
  });

  it('user bien affiché dans le DOM', () => {
    const elName = view.querySelector('[userName]');
    const elEmail = view.querySelector('[userEmail]');
    expect(elName?.textContent).toBe(user.name);
    expect(elEmail?.textContent).toBe(user.email);
  });
});
