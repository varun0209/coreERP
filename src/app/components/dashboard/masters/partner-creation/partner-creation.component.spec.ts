import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerCreationComponent } from './partner-creation.component';

describe('PartnerCreationComponent', () => {
  let component: PartnerCreationComponent;
  let fixture: ComponentFixture<PartnerCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
