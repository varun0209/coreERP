import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentMasterComponent } from './componentmaster.component';

describe('ComponentMasterComponent', () => {
  let component: ComponentMasterComponent;
  let fixture: ComponentFixture<ComponentMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
