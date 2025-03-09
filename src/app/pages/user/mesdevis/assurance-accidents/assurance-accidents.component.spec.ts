import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceAccidentsComponent } from './assurance-accidents.component';

describe('AssuranceAccidentsComponent', () => {
  let component: AssuranceAccidentsComponent;
  let fixture: ComponentFixture<AssuranceAccidentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssuranceAccidentsComponent]
    });
    fixture = TestBed.createComponent(AssuranceAccidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
