import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDayComponent } from './selected-day.component';

describe('SelectedDayComponent', () => {
  let component: SelectedDayComponent;
  let fixture: ComponentFixture<SelectedDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedDayComponent]
    });
    fixture = TestBed.createComponent(SelectedDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
