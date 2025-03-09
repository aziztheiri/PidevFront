import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceHabitationComponent } from './assurance-habitation.component';

describe('AssuranceHabitationComponent', () => {
  let component: AssuranceHabitationComponent;
  let fixture: ComponentFixture<AssuranceHabitationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssuranceHabitationComponent]
    });
    fixture = TestBed.createComponent(AssuranceHabitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
