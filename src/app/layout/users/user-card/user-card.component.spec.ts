import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let tpl: HTMLElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCardComponent]
    });
    fixture = TestBed.createComponent(UserCardComponent);
    tpl = fixture.nativeElement
    component = fixture.componentInstance;
    
    component.user = {
      id: 1,
      email: 'ana@gmail.com',
      username: 'ana',
      name: 'ana'
    }
    
    fixture.detectChanges();
  });

  it('Vérifier que le nom est dans le tpl', () => {
    const nameEl = tpl.querySelector('header')
    expect(nameEl?.textContent).toContain(component.user.name)
  })

  it('Vérifier que le nom est dans le tpl', () => {
    const emailEl = tpl.querySelector('.email')
    expect(emailEl?.textContent).toContain(component.user.email)
  })
});
