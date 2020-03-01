import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PFMasterComponent } from './pfmaster.component';

describe('PFMasterComponent', () => {
  let component: PFMasterComponent;
  let fixture: ComponentFixture<PFMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PFMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PFMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
