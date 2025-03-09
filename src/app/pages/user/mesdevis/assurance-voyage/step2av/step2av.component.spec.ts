import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2avComponent } from './step2av.component';

describe('Step2avComponent', () => {
  let component: Step2avComponent;
  let fixture: ComponentFixture<Step2avComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Step2avComponent]
    });
    fixture = TestBed.createComponent(Step2avComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
