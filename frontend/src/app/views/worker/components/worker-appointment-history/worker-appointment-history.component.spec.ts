import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerAppointmentHistoryComponent } from './worker-appointment-history.component';

describe('WorkerAppointmentHistoryComponent', () => {
  let component: WorkerAppointmentHistoryComponent;
  let fixture: ComponentFixture<WorkerAppointmentHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkerAppointmentHistoryComponent]
    });
    fixture = TestBed.createComponent(WorkerAppointmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
