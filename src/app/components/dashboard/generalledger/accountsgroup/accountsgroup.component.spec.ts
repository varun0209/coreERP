import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsGroupComponent } from './accountsgroup.component';

describe('AccountsGroupComponent', () => {
  let component: AccountsGroupComponent;
  let fixture: ComponentFixture<AccountsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
