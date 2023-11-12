import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerManagementComponent } from './worker-management.component';

describe('WorkerManagementComponent', () => {
  let component: WorkerManagementComponent;
  let fixture: ComponentFixture<WorkerManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkerManagementComponent]
    });
    fixture = TestBed.createComponent(WorkerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
