import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CTCBreakupComponent } from './ctcbreakup.component';

describe('CTCBreakupComponent', () => {
  let component: CTCBreakupComponent;
  let fixture: ComponentFixture<CTCBreakupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CTCBreakupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CTCBreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
