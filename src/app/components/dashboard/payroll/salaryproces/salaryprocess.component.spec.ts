import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryProcessComponent } from './salaryprocess.component';

describe('SalaryProcessComponent', () => {
  let component: SalaryProcessComponent;
  let fixture: ComponentFixture<SalaryProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
