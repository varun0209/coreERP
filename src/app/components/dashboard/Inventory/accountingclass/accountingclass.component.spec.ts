import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingClassComponent } from './accountingclass.component';

describe('AccountingClassComponent', () => {
  let component: AccountingClassComponent;
  let fixture: ComponentFixture<AccountingClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountingClassComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
