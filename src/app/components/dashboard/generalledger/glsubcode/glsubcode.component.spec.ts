import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GlSubcodeComponent } from './glsubcode.component';

describe('GlSubcodeComponent', () => {
  let component: GlSubcodeComponent;
  let fixture: ComponentFixture<GlSubcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlSubcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlSubcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
