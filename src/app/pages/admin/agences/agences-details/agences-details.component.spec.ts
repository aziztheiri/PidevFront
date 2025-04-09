import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencesDetailsComponent } from './agences-details.component';

describe('AgencesDetailsComponent', () => {
  let component: AgencesDetailsComponent;
  let fixture: ComponentFixture<AgencesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgencesDetailsComponent]
    });
    fixture = TestBed.createComponent(AgencesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
