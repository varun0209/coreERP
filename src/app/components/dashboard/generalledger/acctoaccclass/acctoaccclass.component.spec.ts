import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccToAccClassComponent } from './acctoaccclass.component';

describe('AccToAccClassComponent', () => {
  let component: AccToAccClassComponent;
  let fixture: ComponentFixture<AccToAccClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccToAccClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccToAccClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
