import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxIntegrationComponent } from './taxintegration.component';

describe('TaxIntegrationComponent', () => {
  let component: TaxIntegrationComponent;
  let fixture: ComponentFixture<TaxIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
