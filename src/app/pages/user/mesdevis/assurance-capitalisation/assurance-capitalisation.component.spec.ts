import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceCapitalisationComponent } from './assurance-capitalisation.component';

describe('AssuranceCapitalisationComponent', () => {
  let component: AssuranceCapitalisationComponent;
  let fixture: ComponentFixture<AssuranceCapitalisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssuranceCapitalisationComponent]
    });
    fixture = TestBed.createComponent(AssuranceCapitalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
