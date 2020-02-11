import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlAccountsComponent } from './glaccounts.component';

describe('GlAccountsComponent', () => {
  let component: GlAccountsComponent;
  let fixture: ComponentFixture<GlAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
