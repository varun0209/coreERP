import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSeriesComponent } from './no-series.component';

describe('NoSeriesComponent', () => {
  let component: NoSeriesComponent;
  let fixture: ComponentFixture<NoSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
