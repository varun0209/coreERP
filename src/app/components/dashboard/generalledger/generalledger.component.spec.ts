import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralledgerComponent } from './generalledger.component';

describe('GeneralledgerComponent', () => {
  let component: GeneralledgerComponent;
  let fixture: ComponentFixture<GeneralledgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralledgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
