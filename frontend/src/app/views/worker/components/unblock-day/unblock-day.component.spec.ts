import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnblockDayComponent } from './unblock-day.component';

describe('UnblockDayComponent', () => {
  let component: UnblockDayComponent;
  let fixture: ComponentFixture<UnblockDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnblockDayComponent]
    });
    fixture = TestBed.createComponent(UnblockDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
