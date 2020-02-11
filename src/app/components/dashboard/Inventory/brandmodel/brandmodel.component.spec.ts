import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandModelComponent } from './brandmodel.component';

describe('BrandModelComponent', () => {
  let component: BrandModelComponent;
  let fixture: ComponentFixture<BrandModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrandModelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
