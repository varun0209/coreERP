import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitCenterComponent } from './profit-center.component';

describe('ProfitCenterComponent', () => {
  let component: ProfitCenterComponent;
  let fixture: ComponentFixture<ProfitCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
