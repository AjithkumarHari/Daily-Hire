import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceBoxComponent } from './edit-service-box.component';

describe('EditServiceBoxComponent', () => {
  let component: EditServiceBoxComponent;
  let fixture: ComponentFixture<EditServiceBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditServiceBoxComponent]
    });
    fixture = TestBed.createComponent(EditServiceBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
