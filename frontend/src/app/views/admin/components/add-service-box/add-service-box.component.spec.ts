import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceBoxComponent } from './add-service-box.component';

describe('AddServiceBoxComponent', () => {
  let component: AddServiceBoxComponent;
  let fixture: ComponentFixture<AddServiceBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddServiceBoxComponent]
    });
    fixture = TestBed.createComponent(AddServiceBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
