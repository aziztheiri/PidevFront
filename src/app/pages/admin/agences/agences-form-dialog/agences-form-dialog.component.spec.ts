import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencesFormDialogComponent } from './agences-form-dialog.component';

describe('AgencesFormDialogComponent', () => {
  let component: AgencesFormDialogComponent;
  let fixture: ComponentFixture<AgencesFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgencesFormDialogComponent]
    });
    fixture = TestBed.createComponent(AgencesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
