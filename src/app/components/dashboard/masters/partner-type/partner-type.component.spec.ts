import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerTypeComponent } from './partner-type.component';

describe('PartnerTypeComponent', () => {
  let component: PartnerTypeComponent;
  let fixture: ComponentFixture<PartnerTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
