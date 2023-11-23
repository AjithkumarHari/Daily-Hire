import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFormBoxComponent } from './booking-form-box.component';

describe('BookingFormBoxComponent', () => {
  let component: BookingFormBoxComponent;
  let fixture: ComponentFixture<BookingFormBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingFormBoxComponent]
    });
    fixture = TestBed.createComponent(BookingFormBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
