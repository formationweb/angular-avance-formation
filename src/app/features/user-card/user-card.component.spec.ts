import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let elView:  HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    elView = fixture.nativeElement

    component.user = {
      id: 1,
      name: 'ana',
      email: 'ana@gmail.com'
    }

    fixture.detectChanges();
  });

  it('les informations sont bien affichées dans la carte', () => {
      const nameEl = elView.querySelector('[userName]')
      const emailEl = elView.querySelector('[userEmail]')
      expect(nameEl?.textContent).toContain(component.user.name)
      expect(emailEl?.textContent).toContain(component.user.email)
  });
});
