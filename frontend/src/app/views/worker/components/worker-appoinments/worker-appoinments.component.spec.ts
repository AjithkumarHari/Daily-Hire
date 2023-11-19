import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerAppoinmentsComponent } from './worker-appoinments.component';

describe('WorkerAppoinmentsComponent', () => {
  let component: WorkerAppoinmentsComponent;
  let fixture: ComponentFixture<WorkerAppoinmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkerAppoinmentsComponent]
    });
    fixture = TestBed.createComponent(WorkerAppoinmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
