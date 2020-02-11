import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberAssignmentComponent } from './numberassignment.component';

describe('NumberAssignmentComponent', () => {
  let component: NumberAssignmentComponent;
  let fixture: ComponentFixture<NumberAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NumberAssignmentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
