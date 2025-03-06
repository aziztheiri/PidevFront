import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinistreFormComponent } from './sinistre-form.component';

describe('SinistreFormComponent', () => {
  let component: SinistreFormComponent;
  let fixture: ComponentFixture<SinistreFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinistreFormComponent]
    });
    fixture = TestBed.createComponent(SinistreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
