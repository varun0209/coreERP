import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInBranchComponent } from './employee-in-branch.component';

describe('EmployeeInBranchComponent', () => {
  let component: EmployeeInBranchComponent;
  let fixture: ComponentFixture<EmployeeInBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeInBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeInBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
