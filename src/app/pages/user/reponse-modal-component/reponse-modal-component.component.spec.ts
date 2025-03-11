import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseModalComponentComponent } from './reponse-modal-component.component';

describe('ReponseModalComponentComponent', () => {
  let component: ReponseModalComponentComponent;
  let fixture: ComponentFixture<ReponseModalComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReponseModalComponentComponent]
    });
    fixture = TestBed.createComponent(ReponseModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
