import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let el: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement

    component.user = {
      id: 1,
      name: 'test',
      email: 'test@test.com'
    }

    fixture.detectChanges();

  });

  it('Vérifier que les infos sont dans le tpl', () => {
    const userNameEl = el.querySelector('.user-name')
    const userEmailEl = el.querySelector('.user-email')
    expect(userNameEl?.textContent).toContain(component.user.name)
    expect(userEmailEl?.textContent).toContain(component.user.email)
  });
});
