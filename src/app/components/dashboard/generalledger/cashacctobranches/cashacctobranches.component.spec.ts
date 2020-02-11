import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashAccToBranchesComponent } from './cashacctobranches.component';

describe('CashAccToBranchesComponent', () => {
  let component: CashAccToBranchesComponent;
  let fixture: ComponentFixture<CashAccToBranchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashAccToBranchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashAccToBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
