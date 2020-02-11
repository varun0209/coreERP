import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveopeningbalancesComponent } from './leaveopeningbalances.component';

describe('LeaveopeningbalancesComponent', () => {
  let component: LeaveopeningbalancesComponent;
  let fixture: ComponentFixture<LeaveopeningbalancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveopeningbalancesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveopeningbalancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
