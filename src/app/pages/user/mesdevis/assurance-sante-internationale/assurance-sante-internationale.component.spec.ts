import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceSanteInternationaleComponent } from './assurance-sante-internationale.component';

describe('AssuranceSanteInternationaleComponent', () => {
  let component: AssuranceSanteInternationaleComponent;
  let fixture: ComponentFixture<AssuranceSanteInternationaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssuranceSanteInternationaleComponent]
    });
    fixture = TestBed.createComponent(AssuranceSanteInternationaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
