import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDayComponent } from './block-day.component';

describe('BlockDayComponent', () => {
  let component: BlockDayComponent;
  let fixture: ComponentFixture<BlockDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockDayComponent]
    });
    fixture = TestBed.createComponent(BlockDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
