import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinistreListComponent } from './sinistre-list.component';

describe('SinistreListComponent', () => {
  let component: SinistreListComponent;
  let fixture: ComponentFixture<SinistreListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinistreListComponent]
    });
    fixture = TestBed.createComponent(SinistreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
