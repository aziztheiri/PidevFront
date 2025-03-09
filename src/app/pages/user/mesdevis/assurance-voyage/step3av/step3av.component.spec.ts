import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3avComponent } from './step3av.component';

describe('Step3avComponent', () => {
  let component: Step3avComponent;
  let fixture: ComponentFixture<Step3avComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Step3avComponent]
    });
    fixture = TestBed.createComponent(Step3avComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
