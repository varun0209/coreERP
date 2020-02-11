import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavetypesComponent } from './leavetypes.component';

describe('LeavetypesComponent', () => {
  let component: LeavetypesComponent;
  let fixture: ComponentFixture<LeavetypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeavetypesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavetypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
