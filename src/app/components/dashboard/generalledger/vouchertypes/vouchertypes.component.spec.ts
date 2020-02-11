import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherTypesComponent } from './vouchertypes.component';

describe('VoucherTypesComponent', () => {
  let component: VoucherTypesComponent;
  let fixture: ComponentFixture<VoucherTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
