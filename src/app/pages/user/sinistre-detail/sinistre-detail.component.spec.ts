import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinistreDetailComponent } from './sinistre-detail.component';

describe('SinistreDetailComponent', () => {
  let component: SinistreDetailComponent;
  let fixture: ComponentFixture<SinistreDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinistreDetailComponent]
    });
    fixture = TestBed.createComponent(SinistreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
