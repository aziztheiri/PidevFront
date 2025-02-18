import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementfrontComponent } from './paiementfront.component';

describe('PaiementfrontComponent', () => {
  let component: PaiementfrontComponent;
  let fixture: ComponentFixture<PaiementfrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaiementfrontComponent]
    });
    fixture = TestBed.createComponent(PaiementfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
