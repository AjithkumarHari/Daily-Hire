import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerCalenderComponent } from './worker-calender.component';

describe('WorkerCalenderComponent', () => {
  let component: WorkerCalenderComponent;
  let fixture: ComponentFixture<WorkerCalenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkerCalenderComponent]
    });
    fixture = TestBed.createComponent(WorkerCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
