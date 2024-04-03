import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RightBarComponent } from '../bar/right-bar/right-bar.component';

// import { RightBarComponent } from './right-bar.component';

describe('RightBarComponent', () => {
  let component: RightBarComponent;
  let fixture: ComponentFixture<RightBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightBarComponent]
    });
    fixture = TestBed.createComponent(RightBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
