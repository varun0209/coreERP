import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PTMasterComponent } from './ptmaster.component';

describe('PTMasterComponent', () => {
  let component: PTMasterComponent;
  let fixture: ComponentFixture<PTMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PTMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PTMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
