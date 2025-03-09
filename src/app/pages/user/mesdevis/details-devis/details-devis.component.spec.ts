import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDevisComponent } from './details-devis.component';

describe('DetailsDevisComponent', () => {
  let component: DetailsDevisComponent;
  let fixture: ComponentFixture<DetailsDevisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsDevisComponent]
    });
    fixture = TestBed.createComponent(DetailsDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
