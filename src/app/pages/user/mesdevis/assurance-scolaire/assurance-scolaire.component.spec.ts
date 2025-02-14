import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceScolaireComponent } from './assurance-scolaire.component';

describe('AssuranceScolaireComponent', () => {
  let component: AssuranceScolaireComponent;
  let fixture: ComponentFixture<AssuranceScolaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssuranceScolaireComponent]
    });
    fixture = TestBed.createComponent(AssuranceScolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
