import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let tpl: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    tpl = fixture.nativeElement
    component.user = {
      id: 1,
      name: 'ana',
      email: 'ana@gmail.com'
    }
    fixture.detectChanges();
  });

  it('Tester la carte (nom)', () => {
     const header = tpl.querySelector('header')
     expect(header?.textContent).toContain(component.user.name)
  });

  it('Tester la carte (email)', () => {
    const emailEl = tpl.querySelector('.email')
    expect(emailEl?.textContent).toContain(component.user.email)
 });
});
