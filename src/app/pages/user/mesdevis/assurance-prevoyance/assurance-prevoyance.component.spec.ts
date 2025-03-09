import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssurancePrevoyanceComponent } from './assurance-prevoyance.component';

describe('AssurancePrevoyanceComponent', () => {
  let component: AssurancePrevoyanceComponent;
  let fixture: ComponentFixture<AssurancePrevoyanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssurancePrevoyanceComponent]
    });
    fixture = TestBed.createComponent(AssurancePrevoyanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
