import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceFormDialogComponent } from './performance-form-dialog.component';

describe('PerformanceFormDialogComponent', () => {
  let component: PerformanceFormDialogComponent;
  let fixture: ComponentFixture<PerformanceFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceFormDialogComponent]
    });
    fixture = TestBed.createComponent(PerformanceFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
