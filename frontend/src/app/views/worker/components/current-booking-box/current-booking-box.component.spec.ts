import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBookingBoxComponent } from './current-booking-box.component';

describe('CurrentBookingBoxComponent', () => {
  let component: CurrentBookingBoxComponent;
  let fixture: ComponentFixture<CurrentBookingBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentBookingBoxComponent]
    });
    fixture = TestBed.createComponent(CurrentBookingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
