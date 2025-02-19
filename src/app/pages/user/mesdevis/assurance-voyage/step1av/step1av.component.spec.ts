import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1avComponent } from './step1av.component';

describe('Step1avComponent', () => {
  let component: Step1avComponent;
  let fixture: ComponentFixture<Step1avComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Step1avComponent]
    });
    fixture = TestBed.createComponent(Step1avComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
