import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndersubGroupComponent } from './undersubgroup.component';

describe('UndersubGroupComponent', () => {
  let component: UndersubGroupComponent;
  let fixture: ComponentFixture<UndersubGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndersubGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndersubGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
