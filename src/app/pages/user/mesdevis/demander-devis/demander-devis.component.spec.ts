import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemanderDevisComponent } from './demander-devis.component';

describe('DemanderDevisComponent', () => {
  let component: DemanderDevisComponent;
  let fixture: ComponentFixture<DemanderDevisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemanderDevisComponent]
    });
    fixture = TestBed.createComponent(DemanderDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
